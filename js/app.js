/**
 * 神奈川県観光振興EBPMダッシュボード - メインアプリケーション
 */

(function () {
  "use strict";

  const DATA = KANAGAWA_TOURISM_DATA;
  let currentPerspective = "policy";
  let currentPath = [];
  let sunburstSvg = null;

  // Color scales for each perspective
  const colorScales = {
    policy: d3.scaleOrdinal([
      "#2980b9", "#27ae60", "#e67e22", "#8e44ad",
      "#e74c3c", "#1abc9c", "#34495e", "#f39c12",
      "#3498db", "#2ecc71", "#d35400", "#9b59b6"
    ]),
    region: d3.scaleOrdinal([
      "#2980b9", "#27ae60", "#e67e22", "#8e44ad",
      "#1abc9c", "#e74c3c", "#34495e"
    ]),
    resource: d3.scaleOrdinal([
      "#3498db", "#2ecc71", "#e67e22", "#9b59b6",
      "#1abc9c", "#e74c3c", "#f39c12", "#34495e"
    ]),
    traveler: d3.scaleOrdinal([
      "#2980b9", "#27ae60", "#e67e22", "#8e44ad",
      "#e74c3c", "#1abc9c"
    ])
  };

  // === Check if ACTUAL_DATA is available ===
  function hasActualData() {
    return typeof ACTUAL_DATA !== "undefined" && ACTUAL_DATA !== null;
  }

  // === Initialize ===
  function init() {
    // Update KPI latest values from ACTUAL_DATA if available
    if (hasActualData() && ACTUAL_DATA.topKPIs) {
      DATA.topLevel.kpis.forEach(kpi => {
        const tsKey = kpi.timeSeriesKey || kpi.name;
        const tsData = ACTUAL_DATA.topKPIs[tsKey];
        if (tsData && tsData.series) {
          // Find the latest non-null value
          for (let i = tsData.series.length - 1; i >= 0; i--) {
            if (tsData.series[i].value !== null) {
              kpi.latest = {
                value: tsData.series[i].value,
                year: tsData.series[i].year,
                unit: kpi.baseline.unit
              };
              break;
            }
          }
        }
      });
    }

    renderKPISummary(currentPerspective);
    setupPerspectiveTabs();
    renderSunburst();
    renderDataSourceCatalog();

    // Add data freshness indicator
    if (hasActualData() && ACTUAL_DATA.lastUpdated) {
      const badge = document.querySelector(".header-badge");
      if (badge) {
        badge.innerHTML = `<span class="data-freshness"><span class="freshness-dot"></span>データ更新: ${ACTUAL_DATA.lastUpdated}</span>`;
      }
    }
  }

  // === KPI Summary Cards ===
  function renderKPISummary(perspective) {
    const container = document.getElementById("kpi-summary");
    const kpis = DATA.topLevel.kpis;
    const mapping = perspective ? DATA.kpiPerspectiveMapping[perspective] : null;

    container.innerHTML = kpis.map((kpi, idx) => {
      const displayValue = kpi.latest && kpi.latest.value
        ? kpi.latest.value.toLocaleString()
        : (kpi.baseline.value ? kpi.baseline.value.toLocaleString() : "---");
      const displayYear = kpi.latest && kpi.latest.value ? kpi.latest.year : kpi.baseline.year;
      const unit = kpi.latest && kpi.latest.unit ? kpi.latest.unit : kpi.baseline.unit;

      // Check mapping availability
      const kpiMapping = mapping ? mapping[kpi.name] : null;
      const isAvailable = kpiMapping ? kpiMapping.available : false;
      const dimmedClass = (mapping && !isAvailable) ? " kpi-card--dimmed" : "";

      let progressHtml = "";
      if (kpi.target && kpi.target.value && kpi.baseline.value) {
        const current = kpi.latest && kpi.latest.value ? kpi.latest.value : kpi.baseline.value;
        const pct = Math.min(100, ((current - kpi.baseline.value * 0.8) / (kpi.target.value - kpi.baseline.value * 0.8)) * 100);
        const color = pct >= 80 ? "var(--success)" : pct >= 50 ? "var(--accent)" : "var(--danger)";
        progressHtml = `
          <div class="kpi-progress">
            <div class="kpi-progress-bar" style="width:${pct}%; background:${color};"></div>
          </div>
          <div class="kpi-target">目標（${kpi.target.year}年度）: <span class="target-value">${kpi.target.value.toLocaleString()}${unit}</span></div>
        `;
      }

      const noteHtml = kpi.note ? `<div class="kpi-note">${kpi.note}</div>` : "";

      // Build breakdown bar if perspective is active and mapping is available
      let breakdownHtml = "";
      if (perspective && isAvailable) {
        breakdownHtml = buildBreakdownBar(perspective, kpiMapping, idx);
      }

      // Perspective label
      let perspectiveLabelHtml = "";
      if (mapping && isAvailable && kpiMapping.label) {
        perspectiveLabelHtml = `<div class="kpi-perspective-label">${kpiMapping.label}</div>`;
      } else if (mapping && !isAvailable) {
        perspectiveLabelHtml = `<div class="kpi-perspective-label dimmed">この切り口では分解不可</div>`;
      }

      // Trend chart toggle (only if ACTUAL_DATA is available)
      let trendToggleHtml = "";
      let trendContainerHtml = "";
      if (hasActualData()) {
        const tsKey = kpi.timeSeriesKey || kpi.name;
        const tsData = ACTUAL_DATA.topKPIs ? ACTUAL_DATA.topKPIs[tsKey] : null;
        if (tsData && tsData.series) {
          trendToggleHtml = `<button class="trend-toggle-btn" onclick="toggleTrendChart(${idx})" title="経年推移を表示">▼</button>`;
          trendContainerHtml = `<div class="trend-chart-container" id="trend-chart-${idx}"></div>`;
        }
      }

      return `
        <div class="kpi-card fade-in${dimmedClass}" data-kpi-name="${kpi.name}" data-kpi-idx="${idx}">
          ${trendToggleHtml}
          <div class="kpi-label">${kpi.name}</div>
          <div class="kpi-value">${displayValue}<span class="kpi-unit"> ${unit}</span></div>
          <div class="kpi-label" style="margin-top:2px;">${displayYear}年度実績</div>
          ${progressHtml}
          ${noteHtml}
          ${breakdownHtml}
          ${perspectiveLabelHtml}
          <div class="kpi-contribution-badge" style="display:none;"></div>
          ${trendContainerHtml}
        </div>
      `;
    }).join("");
  }

  // === Build Breakdown Bar ===
  function buildBreakdownBar(perspective, kpiMapping, kpiIdx) {
    const perspectiveData = getCurrentDataForPerspective(perspective);
    if (!perspectiveData || !perspectiveData.children) return "";

    const colorScale = colorScales[perspective];
    let segments = [];

    if (kpiMapping.type === "kpi-link") {
      // For policy perspective: show which policy is responsible
      return `<div class="breakdown-link-info">
        <span class="breakdown-link-dot" style="background:var(--primary-light);"></span>
        ${kpiMapping.label}
      </div>`;
    }

    if (kpiMapping.type === "special-traveler-overnight") {
      // Special handling for traveler overnight breakdown
      const tripTypeChild = perspectiveData.children.find(c => c.id === "trip-type");
      if (tripTypeChild && tripTypeChild.children) {
        const total = tripTypeChild.children.reduce((sum, c) => sum + (c.value || 0), 0);
        tripTypeChild.children.forEach((child, i) => {
          segments.push({
            label: child.label,
            value: child.value || 0,
            pct: total > 0 ? ((child.value || 0) / total * 100) : 0,
            color: colorScale(child.label),
            displayValue: child.note || "",
            note: child.note || ""
          });
        });
      }
    } else if (kpiMapping.field) {
      // Direct field mapping (region value, overnight, etc.)
      const field = kpiMapping.field;
      const children = perspectiveData.children;
      const total = children.reduce((sum, c) => sum + (c[field] || 0), 0);

      children.forEach((child, i) => {
        const val = child[field] || 0;
        segments.push({
          label: child.label,
          value: val,
          pct: total > 0 ? (val / total * 100) : 0,
          color: colorScale(child.label),
          displayValue: kpiMapping.type === "relative"
            ? ""
            : `${val.toLocaleString()}${kpiMapping.unit}`
        });
      });
    }

    if (segments.length === 0) return "";

    const segmentHtml = segments.map(s => {
      const titleParts = [s.label];
      if (s.displayValue) titleParts.push(s.displayValue);
      titleParts.push(`${s.pct.toFixed(1)}%`);
      return `<div class="breakdown-segment" style="width:${s.pct}%; background:${s.color};" title="${titleParts.join(" / ")}" data-label="${s.label}"></div>`;
    }).join("");

    const legendHtml = segments.map(s =>
      `<span class="breakdown-legend-item"><span class="breakdown-legend-dot" style="background:${s.color};"></span>${s.label}</span>`
    ).join("");

    return `
      <div class="breakdown-container">
        <div class="breakdown-bar">${segmentHtml}</div>
        <div class="breakdown-legend">${legendHtml}</div>
      </div>
    `;
  }

  function getCurrentDataForPerspective(perspective) {
    switch (perspective) {
      case "policy": return DATA.byPolicy;
      case "region": return DATA.byRegion;
      case "resource": return DATA.byResourceType;
      case "traveler": return DATA.byTravelerType;
      default: return null;
    }
  }

  // === Perspective Tabs ===
  function setupPerspectiveTabs() {
    const tabs = document.querySelectorAll(".perspective-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentPerspective = tab.dataset.perspective;
        currentPath = [];

        if (currentPerspective === "datasources") {
          document.getElementById("chart-area").style.display = "none";
          document.getElementById("datasource-catalog").style.display = "block";
          document.getElementById("breadcrumb").style.display = "none";
          renderKPISummary(null);
        } else {
          document.getElementById("chart-area").style.display = "grid";
          document.getElementById("datasource-catalog").style.display = "none";
          document.getElementById("breadcrumb").style.display = "flex";
          renderKPISummary(currentPerspective);
          renderSunburst();
          resetDetailPanel();
          updateBreadcrumb();
        }
      });
    });
  }

  // === Get current data based on perspective ===
  function getCurrentData() {
    switch (currentPerspective) {
      case "policy": return DATA.byPolicy;
      case "region": return DATA.byRegion;
      case "resource": return DATA.byResourceType;
      case "traveler": return DATA.byTravelerType;
      default: return DATA.byPolicy;
    }
  }

  // === Build hierarchy for D3 ===
  function buildHierarchy(data) {
    return {
      name: data.label,
      id: data.id,
      children: (data.children || []).map(child => buildHierarchyNode(child))
    };
  }

  function buildHierarchyNode(node) {
    const result = {
      name: node.label,
      id: node.id,
      data: node
    };
    if (node.children && node.children.length > 0) {
      result.children = node.children.map(c => buildHierarchyNode(c));
    } else {
      result.value = node.value || 1;
    }
    return result;
  }

  // === Sunburst Chart ===
  function renderSunburst() {
    const container = document.getElementById("sunburst-chart");
    container.innerHTML = "";

    const perspectiveData = getCurrentData();
    const titles = {
      policy: "施策・事業別の因数分解",
      region: "地域別の因数分解（入込観光客数: 万人）",
      resource: "観光資源タイプ別の因数分解",
      traveler: "旅行者属性別の因数分解"
    };
    document.getElementById("chart-title").textContent = titles[currentPerspective] || "";

    const width = Math.min(520, container.parentElement.clientWidth - 48);
    const height = width;
    const radius = width / 2;

    const hierarchy = buildHierarchy(perspectiveData);
    const root = d3.hierarchy(hierarchy)
      .sum(d => d.value || 0)
      .sort((a, b) => b.value - a.value);

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);

    partition(root);

    const colorScale = colorScales[currentPerspective];

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .style("font-family", "inherit");

    sunburstSvg = svg;

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0 * 0.7)
      .outerRadius(d => d.y1 * 0.7 - 1);

    // Draw arcs
    const paths = svg.selectAll("path")
      .data(root.descendants().filter(d => d.depth > 0))
      .join("path")
      .attr("class", "sunburst-arc")
      .attr("d", arc)
      .attr("fill", d => {
        let ancestor = d;
        while (ancestor.depth > 1) ancestor = ancestor.parent;
        return d3.color(colorScale(ancestor.data.name)).brighter(d.depth * 0.3);
      })
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick);

    // Center text
    svg.append("text")
      .attr("class", "sunburst-center-label")
      .attr("dy", "-0.3em")
      .attr("font-size", "0.85rem")
      .text(perspectiveData.label);

    svg.append("text")
      .attr("class", "sunburst-center-label")
      .attr("dy", "1em")
      .attr("font-size", "0.7rem")
      .attr("fill", "#7f8c8d")
      .text("クリックで詳細表示");

    // Add labels for large enough segments
    svg.selectAll("text.arc-label")
      .data(root.descendants().filter(d => d.depth > 0 && (d.x1 - d.x0) > 0.15))
      .join("text")
      .attr("class", "arc-label")
      .attr("transform", d => {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * 0.7;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("font-size", d => d.depth === 1 ? "0.65rem" : "0.55rem")
      .attr("fill", d => d.depth === 1 ? "white" : "#333")
      .attr("pointer-events", "none")
      .text(d => {
        const name = d.data.name;
        // Truncate labels
        const maxLen = d.depth === 1 ? 10 : 8;
        if (name.length > maxLen) {
          // Try to find a short version
          const shortName = name.replace(/^(柱[A-C]: |施策\d+: |分野横断施策)/, "");
          return shortName.length > maxLen ? shortName.substring(0, maxLen) + "…" : shortName;
        }
        return name;
      });
  }

  // === Tooltip handlers ===
  function handleMouseOver(event, d) {
    const tooltip = document.getElementById("tooltip");
    const nodeData = d.data.data || {};

    let content = `<strong>${d.data.name}</strong>`;
    if (nodeData.description) {
      content += `<br><span style="opacity:0.8;">${nodeData.description}</span>`;
    }
    if (currentPerspective === "region" && nodeData.value) {
      content += `<br>入込観光客数: <strong>${nodeData.value.toLocaleString()}万人</strong>`;
      if (nodeData.growth !== undefined) {
        const sign = nodeData.growth >= 0 ? "+" : "";
        content += ` (${sign}${nodeData.growth}%)`;
      }
    }
    if (nodeData.kpis && nodeData.kpis.length > 0) {
      content += `<br>KPI: ${nodeData.kpis.length}項目`;
    }
    if (nodeData.dataSources && nodeData.dataSources.length > 0) {
      content += `<br>データソース: ${nodeData.dataSources.length}種類`;
    }

    tooltip.innerHTML = content;
    tooltip.classList.add("visible");
  }

  function handleMouseMove(event) {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.left = (event.pageX + 12) + "px";
    tooltip.style.top = (event.pageY - 10) + "px";
  }

  function handleMouseOut() {
    const tooltip = document.getElementById("tooltip");
    tooltip.classList.remove("visible");
  }

  // === Click handler ===
  function handleClick(event, d) {
    const nodeData = d.data.data || {};
    document.getElementById("tooltip").classList.remove("visible");

    // Update breadcrumb path
    currentPath = [];
    let node = d;
    while (node.parent) {
      currentPath.unshift({ name: node.data.name, data: node.data.data });
      node = node.parent;
    }
    updateBreadcrumb();

    // Render detail panel
    renderDetailPanel(nodeData, d.data.name);

    // Highlight related KPI cards
    highlightRelatedKPIs(d);
  }

  // === Highlight KPI cards based on clicked node ===
  function highlightRelatedKPIs(d) {
    const nodeData = d.data.data || {};
    const nodeName = d.data.name;
    const mapping = DATA.kpiPerspectiveMapping[currentPerspective];
    if (!mapping) return;

    // Clear previous highlights
    clearKPIHighlights();

    const kpiCards = document.querySelectorAll(".kpi-card[data-kpi-name]");
    kpiCards.forEach(card => {
      const kpiName = card.getAttribute("data-kpi-name");
      const kpiMapping = mapping[kpiName];
      if (!kpiMapping || !kpiMapping.available) return;

      let contributionValue = null;
      let contributionPct = null;
      let contributionLabel = nodeName;

      if (kpiMapping.field && nodeData[kpiMapping.field] !== undefined) {
        // Direct field value (region perspective)
        contributionValue = nodeData[kpiMapping.field];
        if (kpiMapping.totalValue) {
          contributionPct = (contributionValue / kpiMapping.totalValue * 100).toFixed(1);
        } else {
          // Calculate from siblings
          const perspectiveData = getCurrentDataForPerspective(currentPerspective);
          if (perspectiveData && perspectiveData.children) {
            const total = perspectiveData.children.reduce((sum, c) => sum + (c[kpiMapping.field] || 0), 0);
            contributionPct = total > 0 ? (contributionValue / total * 100).toFixed(1) : null;
          }
        }
      } else if (kpiMapping.type === "relative" && nodeData.value !== undefined) {
        // Relative value (resource/traveler perspective)
        const perspectiveData = getCurrentDataForPerspective(currentPerspective);
        if (perspectiveData && perspectiveData.children) {
          const total = perspectiveData.children.reduce((sum, c) => sum + (c.value || 0), 0);
          contributionPct = total > 0 ? (nodeData.value / total * 100).toFixed(1) : null;
        }
      } else if (kpiMapping.type === "kpi-link" && nodeData.kpis) {
        // Check if this node has the linked KPI
        const linkedKpi = nodeData.kpis.find(k => k.name === kpiMapping.linkedKpiName);
        if (linkedKpi) {
          contributionValue = linkedKpi.baseline.value;
          contributionLabel = `${nodeName}が管理`;
        }
      }

      if (contributionValue !== null || contributionPct !== null) {
        card.classList.add("kpi-card--highlighted");

        const badge = card.querySelector(".kpi-contribution-badge");
        if (badge) {
          let badgeText = contributionLabel;
          if (contributionValue !== null && kpiMapping.unit) {
            badgeText += `: ${contributionValue.toLocaleString()}${kpiMapping.unit}`;
          }
          if (contributionPct !== null) {
            badgeText += ` (${contributionPct}%)`;
          }
          badge.textContent = badgeText;
          badge.style.display = "block";
        }

        // Highlight matching segment in breakdown bar
        const segments = card.querySelectorAll(".breakdown-segment");
        segments.forEach(seg => {
          if (seg.getAttribute("data-label") === nodeName) {
            seg.classList.add("breakdown-segment--active");
          } else {
            seg.classList.add("breakdown-segment--dimmed");
          }
        });
      }
    });
  }

  function clearKPIHighlights() {
    document.querySelectorAll(".kpi-card--highlighted").forEach(card => {
      card.classList.remove("kpi-card--highlighted");
    });
    document.querySelectorAll(".kpi-contribution-badge").forEach(badge => {
      badge.style.display = "none";
      badge.textContent = "";
    });
    document.querySelectorAll(".breakdown-segment--active").forEach(seg => {
      seg.classList.remove("breakdown-segment--active");
    });
    document.querySelectorAll(".breakdown-segment--dimmed").forEach(seg => {
      seg.classList.remove("breakdown-segment--dimmed");
    });
  }

  // === Trend Chart (D3.js bar chart with target line) ===
  function renderTrendChart(containerId, seriesData, options) {
    if (!seriesData || !seriesData.series || seriesData.series.length === 0) return;

    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    const margin = { top: 16, right: 12, bottom: 28, left: 48 };
    const width = options.width || 280;
    const height = options.height || 160;
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const series = seriesData.series;
    const unit = seriesData.unit || options.unit || "";
    const targetValue = options.targetValue || null;

    const svg = d3.select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleBand()
      .domain(series.map(d => d.year))
      .range([0, innerW])
      .padding(0.3);

    const maxVal = d3.max(series, d => d.value || 0);
    const yMax = Math.max(maxVal * 1.15, targetValue ? targetValue * 1.1 : 0);
    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([innerH, 0]);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(xScale).tickFormat(d => `${d}`))
      .selectAll("text")
      .attr("font-size", "0.55rem")
      .attr("fill", "#7f8c8d");

    // Y axis
    g.append("g")
      .call(d3.axisLeft(yScale).ticks(4).tickFormat(d => {
        if (d >= 10000) return (d / 10000).toFixed(1) + "万";
        return d.toLocaleString();
      }))
      .selectAll("text")
      .attr("font-size", "0.55rem")
      .attr("fill", "#7f8c8d");

    // Grid lines
    g.selectAll(".grid-line")
      .data(yScale.ticks(4))
      .join("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d))
      .attr("stroke", "#ecf0f1")
      .attr("stroke-dasharray", "2,2");

    // Bars
    g.selectAll(".trend-bar")
      .data(series)
      .join("rect")
      .attr("class", "trend-bar")
      .attr("x", d => xScale(d.year))
      .attr("y", d => d.value !== null ? yScale(d.value) : innerH)
      .attr("width", xScale.bandwidth())
      .attr("height", d => d.value !== null ? innerH - yScale(d.value) : 0)
      .attr("rx", 2)
      .attr("fill", d => {
        if (d.value === null) return "transparent";
        if (d.year === 2020 || d.year === 2021) return "rgba(41, 128, 185, 0.35)";
        return "var(--primary-light)";
      });

    // Value labels on bars
    g.selectAll(".bar-label")
      .data(series)
      .join("text")
      .attr("class", "bar-label")
      .attr("x", d => xScale(d.year) + xScale.bandwidth() / 2)
      .attr("y", d => d.value !== null ? yScale(d.value) - 4 : innerH - 4)
      .attr("text-anchor", "middle")
      .attr("font-size", "0.5rem")
      .attr("fill", d => d.value !== null ? "var(--text)" : "var(--text-light)")
      .text(d => {
        if (d.value === null) return "未公表";
        if (d.value >= 10000) return (d.value / 10000).toFixed(1) + "万";
        return d.value.toLocaleString();
      });

    // Target line
    if (targetValue) {
      g.append("line")
        .attr("x1", 0)
        .attr("x2", innerW)
        .attr("y1", yScale(targetValue))
        .attr("y2", yScale(targetValue))
        .attr("stroke", "var(--accent)")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "6,3");

      g.append("text")
        .attr("x", innerW)
        .attr("y", yScale(targetValue) - 4)
        .attr("text-anchor", "end")
        .attr("font-size", "0.5rem")
        .attr("fill", "var(--accent)")
        .attr("font-weight", "600")
        .text(`目標: ${targetValue.toLocaleString()}${unit}`);
    }

    // Unit label
    svg.append("text")
      .attr("x", 4)
      .attr("y", 10)
      .attr("font-size", "0.5rem")
      .attr("fill", "var(--text-light)")
      .text(`(${unit})`);
  }

  // === Breadcrumb ===
  function updateBreadcrumb() {
    const container = document.getElementById("breadcrumb");
    const perspectiveLabels = {
      policy: "施策・事業別",
      region: "地域別",
      resource: "観光資源タイプ別",
      traveler: "旅行者属性別"
    };

    let html = `<span class="breadcrumb-item${currentPath.length === 0 ? " current" : ""}" onclick="resetView()">観光振興</span>`;

    if (currentPath.length > 0) {
      html += `<span class="breadcrumb-separator">▸</span>`;
      html += `<span class="breadcrumb-item${currentPath.length === 1 ? "" : ""}" onclick="resetView()">${perspectiveLabels[currentPerspective]}</span>`;
    }

    currentPath.forEach((item, i) => {
      html += `<span class="breadcrumb-separator">▸</span>`;
      const isCurrent = i === currentPath.length - 1;
      const shortName = item.name.length > 20 ? item.name.substring(0, 20) + "…" : item.name;
      html += `<span class="breadcrumb-item${isCurrent ? " current" : ""}">${shortName}</span>`;
    });

    container.innerHTML = html;
  }

  // === Detail Panel ===
  function renderDetailPanel(nodeData, name) {
    const panel = document.getElementById("detail-panel");

    if (!nodeData || (!nodeData.kpis?.length && !nodeData.dataSources?.length && !nodeData.value)) {
      panel.innerHTML = `
        <h3>${name}</h3>
        <div class="detail-description">${nodeData?.description || ""}</div>
        <div class="detail-empty">
          <div class="empty-icon">📊</div>
          <p>この要素の詳細データはありません。<br>下位要素をクリックしてください。</p>
        </div>
      `;
      return;
    }

    let html = `<h3>${name}</h3>`;

    if (nodeData.description) {
      html += `<div class="detail-description">${nodeData.description}</div>`;
    }

    // Region-specific data
    if (currentPerspective === "region" && nodeData.value) {
      html += renderRegionDetail(nodeData);
    }

    // KPIs
    if (nodeData.kpis && nodeData.kpis.length > 0) {
      html += `<h4 style="font-size:0.85rem; margin:12px 0 8px; color:var(--text);">KPI・成果指標</h4>`;
      nodeData.kpis.forEach(kpi => {
        html += renderKPIDetail(kpi);
      });
    }

    // Data Sources
    if (nodeData.dataSources && nodeData.dataSources.length > 0) {
      html += renderDataSources(nodeData.dataSources);
    }

    panel.innerHTML = html;
    panel.scrollTop = 0;

    // Render trend charts in detail panel after DOM is ready
    if (hasActualData() && ACTUAL_DATA.subKPIs && nodeData.kpis) {
      setTimeout(() => {
        nodeData.kpis.forEach(kpi => {
          const subData = ACTUAL_DATA.subKPIs[kpi.name];
          if (subData) {
            const chartId = `detail-trend-${kpi.name.replace(/[^a-zA-Z0-9]/g, "")}`;
            renderTrendChart(chartId, subData, {
              width: 340,
              height: 150,
              unit: subData.unit || "",
              targetValue: kpi.target ? kpi.target.value : null
            });
          }
        });
      }, 50);
    }
  }

  function renderRegionDetail(nodeData) {
    const growth = nodeData.growth !== undefined ? nodeData.growth : null;
    const growthSign = growth >= 0 ? "+" : "";
    const growthClass = growth >= 0 ? "positive" : "negative";

    let html = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
        <div class="kpi-card" style="border-left-color:var(--chart-1); padding:14px;">
          <div class="kpi-label">入込観光客数</div>
          <div class="kpi-value" style="font-size:1.4rem;">${nodeData.value.toLocaleString()}<span class="kpi-unit">万人</span></div>
          ${growth !== null ? `<div class="region-growth ${growthClass}">(前年比 ${growthSign}${growth}%)</div>` : ""}
        </div>
    `;

    if (nodeData.dayTrip !== undefined) {
      const overnightPct = nodeData.overnight ? ((nodeData.overnight / nodeData.value) * 100).toFixed(1) : "---";
      html += `
        <div class="kpi-card" style="border-left-color:var(--chart-2); padding:14px;">
          <div class="kpi-label">日帰り / 宿泊</div>
          <div style="font-size:0.85rem;">
            日帰り: <strong>${nodeData.dayTrip.toLocaleString()}万人</strong><br>
            宿泊: <strong>${nodeData.overnight.toLocaleString()}万人</strong> (${overnightPct}%)
          </div>
        </div>
      `;
    }

    html += `</div>`;
    return html;
  }

  function renderKPIDetail(kpi) {
    const baseline = kpi.baseline.value;
    const target = kpi.target.value;

    if (!baseline || !target) {
      return `
        <div class="kpi-detail">
          <div class="kpi-detail-name">${kpi.name}</div>
          <div style="font-size:0.8rem; color:var(--text-light);">
            ${baseline ? `基準値: ${baseline.toLocaleString()} (${kpi.baseline.year}年度)` : "基準値未設定"}
            ${target ? ` → 目標値: ${target.toLocaleString()} (${kpi.target.year}年度)` : ""}
          </div>
        </div>
      `;
    }

    const progress = ((baseline) / target) * 100;
    const color = progress >= 90 ? "var(--success)" : progress >= 70 ? "var(--accent)" : "var(--chart-1)";

    let targetsHtml = "";
    if (kpi.targets) {
      targetsHtml = `<div style="display:flex; gap:8px; margin-top:6px; flex-wrap:wrap;">`;
      Object.entries(kpi.targets).forEach(([year, val]) => {
        targetsHtml += `
          <div style="font-size:0.65rem; color:var(--text-light); background:var(--bg); padding:2px 6px; border-radius:3px;">
            ${year}: ${val.toLocaleString()}
          </div>
        `;
      });
      targetsHtml += `</div>`;
    }

    // Trend chart in detail panel
    let trendHtml = "";
    if (hasActualData() && ACTUAL_DATA.subKPIs && ACTUAL_DATA.subKPIs[kpi.name]) {
      const chartId = `detail-trend-${kpi.name.replace(/[^a-zA-Z0-9]/g, "")}`;
      trendHtml = `<div class="detail-trend-chart" id="${chartId}"></div>`;
    }

    return `
      <div class="kpi-detail">
        <div class="kpi-detail-name">${kpi.name}</div>
        <div class="kpi-gauge">
          <div class="gauge-bar">
            <div class="gauge-fill" style="width:${Math.min(100, progress)}%; background:${color};"></div>
          </div>
          <div class="gauge-value">${baseline.toLocaleString()}</div>
        </div>
        <div class="kpi-baseline-target">
          <span>基準値: ${baseline.toLocaleString()} (${kpi.baseline.year})</span>
          <span>目標: ${target.toLocaleString()} (${kpi.target.year})</span>
        </div>
        ${targetsHtml}
        ${trendHtml}
      </div>
    `;
  }

  function renderDataSources(sources) {
    let html = `
      <div class="data-sources-section">
        <h4>📂 利用可能データソース（${sources.length}件）</h4>
    `;

    sources.forEach(src => {
      const typeLabels = {
        "public": "公的統計",
        "private-free": "民間(無料)",
        "private": "民間(有料)"
      };
      const typeLabel = typeLabels[src.type] || src.type;

      let linkHtml = "";
      if (src.url) {
        linkHtml = `<a href="${src.url}" target="_blank" rel="noopener" class="data-source-link">[リンク]</a>`;
      }

      // Cost badge for paid sources
      let costHtml = "";
      if (src.type === "private" && hasActualData() && ACTUAL_DATA.paidDataCosts) {
        const costInfo = ACTUAL_DATA.paidDataCosts[src.costId || src.id || ""];
        if (costInfo) {
          costHtml = `<br><span class="cost-badge"><span class="cost-icon">💰</span> ${costInfo.estimatedCost}`;
          if (costInfo.note) {
            costHtml += `<span class="cost-note">（${costInfo.note}）</span>`;
          }
          costHtml += `</span>`;
        }
      }

      html += `
        <div class="data-source-item">
          <span class="data-source-badge ${src.type}">${typeLabel}</span>
          <div>
            <span class="data-source-name">${src.name}</span>
            <span class="data-source-provider">（${src.provider}）</span>
            ${src.frequency ? `<span style="font-size:0.65rem; color:var(--text-light);"> [${src.frequency}]</span>` : ""}
            ${linkHtml}
            ${src.note ? `<br><span class="data-source-note">${src.note}</span>` : ""}
            ${src.estatId ? `<br><span style="font-size:0.6rem; color:var(--text-light);">e-Stat ID: ${src.estatId}</span>` : ""}
            ${costHtml}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    return html;
  }

  function resetDetailPanel() {
    const panel = document.getElementById("detail-panel");
    panel.innerHTML = `
      <div class="detail-empty">
        <div class="empty-icon">🔍</div>
        <p>チャートの要素をクリックして<br>詳細データを表示</p>
        <p style="margin-top: 8px; font-size: 0.75rem;">各要素に紐づくKPI目標値と<br>利用可能なデータソースを確認できます</p>
      </div>
    `;
    clearKPIHighlights();
  }

  // === Data Source Catalog ===
  function renderDataSourceCatalog() {
    const container = document.getElementById("datasource-list");
    const categories = DATA.allDataSources.categories;

    let totalSources = 0;
    categories.forEach(cat => totalSources += cat.sources.length);

    // Count sources with actual data values
    let sourcesWithData = 0;
    if (hasActualData() && ACTUAL_DATA.dataSourceValues) {
      categories.forEach(cat => {
        cat.sources.forEach(src => {
          const dsv = ACTUAL_DATA.dataSourceValues[src.id];
          if (dsv && dsv.latestValue && dsv.latestValue !== "---") sourcesWithData++;
        });
      });
    }

    let dataCountHtml = sourcesWithData > 0
      ? ` | うち <strong>${sourcesWithData}</strong> 件にデータ値あり`
      : "";

    let html = `<p style="font-size:0.8rem; color:var(--text-light); margin-bottom:16px;">
      合計 <strong>${totalSources}</strong> データソース（${categories.length}カテゴリ）${dataCountHtml}
    </p>`;

    categories.forEach((cat, catIdx) => {
      html += `
        <div class="datasource-category">
          <div class="datasource-category-header" onclick="toggleCategory(${catIdx})">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
            <span class="category-count">${cat.sources.length}</span>
          </div>
          <div class="datasource-category-list" id="cat-${catIdx}">
      `;

      cat.sources.forEach(src => {
        const freqBadge = src.frequency ? `<span class="freq-badge">${src.frequency}</span>` : "";
        const apiBadge = src.apiAvailable ? `<span class="api-badge">API</span>` : "";
        const freeLabel = src.free ? "無料" : "有料";
        const freeClass = src.free ? "public" : "private";

        // Cost info for paid sources in catalog
        let costHtml = "";
        if (!src.free && hasActualData() && ACTUAL_DATA.paidDataCosts) {
          const costInfo = ACTUAL_DATA.paidDataCosts[src.costId || src.id || ""];
          if (costInfo) {
            costHtml = `<br><span class="cost-badge" style="margin-top:2px;"><span class="cost-icon">💰</span> ${costInfo.estimatedCost}</span>`;
          }
        }

        // Data value badge from dataSourceValues
        let dataValueHtml = "";
        if (hasActualData() && ACTUAL_DATA.dataSourceValues) {
          const dsv = ACTUAL_DATA.dataSourceValues[src.id];
          if (dsv && dsv.latestValue && dsv.latestValue !== "---") {
            const reliabilityClass = dsv.reliability === "high" ? "reliability-high"
              : dsv.reliability === "medium" ? "reliability-medium"
              : dsv.reliability === "low" ? "reliability-low"
              : "reliability-meta";
            const reliabilityLabel = dsv.reliability === "high" ? "公式"
              : dsv.reliability === "medium" ? "近似"
              : dsv.reliability === "low" ? "推定"
              : "";
            const yearStr = dsv.year ? `${dsv.year}年` : "";
            dataValueHtml = `
              <div class="ds-value-badge">
                <span class="ds-value-number">${dsv.latestValue}<span class="ds-value-unit">${dsv.unit}</span></span>
                <span class="ds-value-year">${yearStr}</span>
                ${reliabilityLabel ? `<span class="ds-reliability ${reliabilityClass}">${reliabilityLabel}</span>` : ""}
              </div>`;
            if (dsv.detail) {
              dataValueHtml += `<div class="ds-value-detail">${dsv.detail}</div>`;
            }
          } else if (dsv && dsv.latestValue === "---") {
            dataValueHtml = `<div class="ds-value-meta">${dsv.detail || "メタデータのみ"}</div>`;
          }
        }

        html += `
          <div class="datasource-category-item">
            <span class="data-source-badge ${freeClass}">${freeLabel}</span>
            <span style="flex:1;">
              <strong>${src.name}</strong> <span style="color:var(--text-light);">（${src.provider}）</span>
              ${costHtml}
              ${dataValueHtml}
            </span>
            ${freqBadge}
            ${apiBadge}
          </div>
        `;
      });

      html += `</div></div>`;
    });

    container.innerHTML = html;
  }

  // === Global functions ===
  window.resetView = function () {
    currentPath = [];
    updateBreadcrumb();
    resetDetailPanel();
    clearKPIHighlights();
  };

  window.toggleCategory = function (idx) {
    const el = document.getElementById(`cat-${idx}`);
    el.classList.toggle("open");
  };

  window.toggleTrendChart = function (kpiIdx) {
    const container = document.getElementById(`trend-chart-${kpiIdx}`);
    if (!container) return;

    const btn = container.parentElement.querySelector(".trend-toggle-btn");

    if (container.classList.contains("open")) {
      container.classList.remove("open");
      if (btn) btn.textContent = "▼";
    } else {
      container.classList.add("open");
      if (btn) btn.textContent = "▲";

      // Render chart if not yet rendered
      if (!container.querySelector("svg")) {
        const kpi = DATA.topLevel.kpis[kpiIdx];
        const tsKey = kpi.timeSeriesKey || kpi.name;
        const tsData = ACTUAL_DATA.topKPIs[tsKey];
        if (tsData) {
          renderTrendChart(`trend-chart-${kpiIdx}`, tsData, {
            width: 300,
            height: 170,
            unit: tsData.unit || kpi.baseline.unit,
            targetValue: kpi.target && kpi.target.value ? kpi.target.value : null
          });
        }
      }
    }
  };

  // === Start ===
  document.addEventListener("DOMContentLoaded", init);
})();
