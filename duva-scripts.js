console.log("✅ DUVA script loaded correctly");

// ✅ Title: Inject Selected Accessories into PDF Content //
function injectAccessoriesIntoPDF() {
  const accessoriesList = window.selectedAccessories;

  if (!accessoriesList || accessoriesList.length === 0) return;

  const pdfContainer = document.querySelector('.pdf-content');
  if (!pdfContainer) return;

  const existingSection = pdfContainer.querySelector('.pdf-accessory-list');
  if (existingSection) existingSection.remove();

  const section = document.createElement('div');
  section.className = 'pdf-accessory-list';
  section.style.marginTop = '24px';

  const title = document.createElement('h3');
  title.textContent = 'Selected Accessories';
  title.style.fontSize = '16px';
  title.style.color = '#c0392b';
  title.style.marginBottom = '8px';
  section.appendChild(title);

  accessoriesList.forEach(({ title, code, desc, image }) => {
    const item = document.createElement('div');
    item.className = 'pdf-accessory-item';
    item.style.marginBottom = '16px';

    const img = document.createElement('img');
    img.src = image || '';
    img.alt = title || '';
    img.style.width = '80px';
    img.style.marginBottom = '8px';

    const titleDiv = document.createElement('div');
    titleDiv.textContent = `Title: ${title}`;

    const codeDiv = document.createElement('div');
    codeDiv.textContent = `Code: ${code}`;

    const descDiv = document.createElement('div');
    descDiv.textContent = `Description: ${desc}`;

    item.appendChild(img);
    item.appendChild(titleDiv);
    item.appendChild(codeDiv);
    item.appendChild(descDiv);

    section.appendChild(item);
  });

  pdfContainer.appendChild(section);
}
// ✅ End Inject Selected Accessories into PDF Content //

// ✅ Accessory Checkbox Activation Script //
  document.addEventListener("DOMContentLoaded", function () {
    // Select all accessory checkboxes
    const checkboxes = document.querySelectorAll('.accessory-checkbox');

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', function () {
        // Toggle the .active class
        checkbox.classList.toggle('active');

        // Get the accessory code (inside the same item)
        const accessoryItem = checkbox.closest('.accessory-item');
        const codeElement = accessoryItem.querySelector('.accessory-code');

        if (!window.selectedAccessories) {
          window.selectedAccessories = [];
        }

        const code = codeElement ? codeElement.textContent.trim() : null;

        if (checkbox.classList.contains('active')) {
          // Add if not already there
          if (code && !window.selectedAccessories.includes(code)) {
            window.selectedAccessories.push(code);
          }
        } else {
          // Remove if deselected
          if (code) {
            window.selectedAccessories = window.selectedAccessories.filter(c => c !== code);
          }
        }

        // Debug (optional)
        console.log('Selected Accessories:', window.selectedAccessories);
      });
    });
  });
// ✅ End Accessory Checkbox Activation Script //

// === Accessory Checkbox Toggle Script === //
  document.addEventListener("DOMContentLoaded", function () {
    const accessoryCheckboxes = document.querySelectorAll(".accessory-checkbox");

    accessoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("click", function () {
        checkbox.classList.toggle("active");
      });
    });
  });
</script>
// === End Accessory Checkbox Toggle Script === //

// === Accessory Checkbox JS: Track Selected Accessories (Full Info) === //
  const accessoryCheckboxes = document.querySelectorAll('.accessory-checkbox');
  window.selectedAccessories = [];

  accessoryCheckboxes.forEach(box => {
    box.addEventListener('click', function () {
      this.classList.toggle('active');

      const accessoryItem = this.closest('.accessory-item');
      const title = this.dataset.title;
      const code = this.dataset.code;
      const image = accessoryItem.querySelector('.accessory-image img')?.src;
      const description = accessoryItem.querySelector('.accessory-desc')?.textContent?.trim();

      const item = { title, code, image, description };

      const index = window.selectedAccessories.findIndex(acc => acc.code === code);

      if (this.classList.contains('active')) {
        if (index === -1) {
          window.selectedAccessories.push(item);
        }
      } else {
        if (index !== -1) {
          window.selectedAccessories.splice(index, 1);
        }
      }

      console.log("✅ Selected Accessories:", window.selectedAccessories);
    });
  });
// === End Accessory Checkbox JS === //

// === JavaScript: Hover Zoom + Cursor Tracking for Accessory Images === //
  document.querySelectorAll('.accessory-image').forEach(container => {
    const img = container.querySelector('img');

    // Zoom in on hover
    container.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(2.7)';
    });

    // Track mouse position for dynamic zoom focus
    container.addEventListener('mousemove', e => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
    });

    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = 'center center';
    });
  });
// === End JavaScript: Hover Zoom + Cursor Tracking === //

  document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("main-lightbox-trigger");
    const thumbnails = document.querySelectorAll(".thumbnail-image");

    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        // === Get the source of the clicked thumbnail
        const newSrc = thumb.getAttribute("src");

        // === Update the main image
        if (newSrc && mainImage) {
          mainImage.setAttribute("src", newSrc);
        }
      });
    });
  });
// === End Simple Thumbnail Image Script === //

// === Lightbox Trigger Redirect Script === //
  document.addEventListener("DOMContentLoaded", function () {
    const mainTrigger = document.getElementById("main-lightbox-trigger");
    const firstGalleryItem = document.querySelector(".first-gallery-image");

    // === When main image is clicked, open the Webflow lightbox
    if (mainTrigger && firstGalleryItem) {
      mainTrigger.addEventListener("click", () => {
        firstGalleryItem.click();
      });
    }
  });
// === End Lightbox Trigger Script === //
// === Product Configurator Script === //
document.addEventListener("DOMContentLoaded", function () {
  // === Global Selectors & State ===
  const dropdowns = document.querySelectorAll(".dropdown-wrapper");
  const ralInput = document.querySelector("#ral-input");

  // === RAL Input Initial Setup ===
  if (ralInput) {
    ralInput.style.display = "none";
    ralInput.textContent = "Enter RAL number here";
    ralInput.setAttribute("contenteditable", "true");
    ralInput.style.color = "#999";
    ralInput.style.padding = "6px 8px";
    ralInput.style.minHeight = "48px";
    ralInput.style.backgroundColor = "#f8f8f8";
    ralInput.style.borderRadius = "6px";
    ralInput.style.cursor = "text";
  }

  // === Global Selection State ===
  window.currentSelection = {
    product: document.querySelector("#product-code-heading")?.textContent.trim() || null,
    watt: null,
    cct: null,
    cri: null,
    finish: null,
    defaults: {}
  };

  // === Reset Button Setup ===
  const resetButton = document.querySelector(".reset-button");
  if (resetButton) {
    resetButton.style.display = "flex";
    resetButton.style.alignItems = "center";
    resetButton.style.justifyContent = "center";
  }

  // === Reset Button Handler ===
  resetButton?.addEventListener("click", () => {
    dropdowns.forEach(dropdown => {
      const type = dropdown.getAttribute("data-type");
      const selected = dropdown.querySelector(".selected-value");
      const source = dropdown.querySelector(".dropdown-source");

      if (!type || !selected || !source) return;

      const rawText = source.textContent.trim();
      const values = [...new Set(rawText.split(",").map(v => v.trim()).filter(v => v))];
      const firstValue = values[0] || "XX";

      selected.textContent = firstValue;
      window.currentSelection[type] = firstValue;
      window.currentSelection.defaults[type] = normalizeValue(type, firstValue);

      // RAL reset logic
      if (type === "finish") {
        if (firstValue.toLowerCase() === "ral") {
          ralInput.style.display = "block";
          ralInput.textContent = "Enter RAL number here";
          ralInput.style.color = "#999";
          window.currentSelection.finish = "RAL";
        } else {
          ralInput.style.display = "none";
          ralInput.textContent = "Enter RAL number here";
          ralInput.style.color = "#999";
        }
      }
    });

    updateLumenValue();
    updateOrderingCode();
  });

  // === Dropdown Setup & Interactions ===
  dropdowns.forEach(dropdown => {
    const type = dropdown.getAttribute("data-type");
    const source = dropdown.querySelector(".dropdown-source");
    const field = dropdown.querySelector(".dropdown-field");
    const selected = dropdown.querySelector(".selected-value");
    const arrow = dropdown.querySelector(".dropdown-arrow");

    if (!field || !selected || !source) return;

    // Disable static dropdowns (e.g., lumen)
    if (type === "lumen") {
      dropdown.classList.add("disabled");
      arrow && (arrow.style.display = "none");
      return;
    }

    // Parse values
    const rawText = source.textContent.trim();
    const values = [...new Set(
      rawText.split(",")
             .map(v => v.trim())
             .filter(v => v && !["na", "n/a", "none", "0", "--"].includes(v.toLowerCase()))
    )];

    if (values.length === 0) {
      dropdown.closest(".spec-row")?.remove();
      return;
    }

    // Set default selected value
    selected.textContent = values[0] || "N/A";
    if (type) {
      window.currentSelection[type] = values[0];
      window.currentSelection.defaults[type] = normalizeValue(type, values[0]);
    }

    if (values.length <= 1) {
      dropdown.classList.add("disabled");
      arrow && (arrow.style.display = "none");
      return;
    }

    // Create dropdown options
    const optionsBox = document.createElement("div");
    optionsBox.className = "dropdown-options";
    dropdown.appendChild(optionsBox);

    values.forEach(value => {
      const opt = document.createElement("div");
      opt.className = "dropdown-option";
      opt.textContent = value;
      opt.addEventListener("click", () => {
        if (selected.textContent === value) return;
        selected.textContent = value;
        optionsBox.style.display = "none";
        dropdown.classList.remove("open");

        if (type) {
          // RAL logic
          if (type === "finish" && value.toLowerCase() === "ral") {
            if (ralInput) {
              ralInput.style.display = "block";
              ralInput.textContent = "Enter RAL number here";
              ralInput.style.color = "#999";
              ralInput.addEventListener("focus", () => {
                if (ralInput.textContent === "Enter RAL number here") {
                  ralInput.textContent = "";
                  ralInput.style.color = "#111";
                }
              });
              ralInput.addEventListener("input", () => {
                const typedRAL = ralInput.textContent.trim();
                window.currentSelection.finish = typedRAL ? "RAL" + typedRAL : "RAL";
                updateOrderingCode();
              });
            }
            window.currentSelection.finish = "RAL";
          } else {
            if (ralInput) {
              ralInput.style.display = "none";
              ralInput.textContent = "Enter RAL number here";
              ralInput.style.color = "#999";
            }
            window.currentSelection[type] = value;
          }
        }

        updateLumenValue();
        updateOrderingCode();
      });
      optionsBox.appendChild(opt);
    });

    // Toggle dropdown
    arrow?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = optionsBox.style.display === "block";
      document.querySelectorAll(".dropdown-options").forEach(opt => opt.style.display = "none");
      document.querySelectorAll(".dropdown-wrapper").forEach(d => d.classList.remove("open"));
      if (!isOpen) {
        optionsBox.style.display = "block";
        dropdown.classList.add("open");
      }
    });

    // Close on outside click
    document.addEventListener("click", () => {
      optionsBox.style.display = "none";
      dropdown.classList.remove("open");
    });
  });

  // === Update Lumen Value Based on Selection ===
  function updateLumenValue() {
    const { product, watt, cct, cri } = window.currentSelection;
    const match = Array.from(document.querySelectorAll(".lumen-cms-data")).find(el =>
      el.dataset.product === product &&
      el.dataset.watt === watt &&
      el.dataset.cct === cct &&
      (!el.dataset.cri || el.dataset.cri === cri)
    );

    const lumenSelected = document.querySelector('[data-type="lumen"] .selected-value');

    if (match && lumenSelected) {
      lumenSelected.textContent = match.dataset.lumen;
      lumenSelected.style.color = "#111";
      lumenSelected.style.fontWeight = "bold";
    } else if (lumenSelected) {
      lumenSelected.textContent = "Not Available";
      lumenSelected.style.color = "red";
      lumenSelected.style.fontWeight = "bold";
    }
  }

  // === Normalize Value for Code Generation ===
  function normalizeValue(type, val) {
    val = val?.toLowerCase();
    if (!val) return "XX";

    if (type === "cct") return val.replace("k", "").substring(0, 2);
    if (type === "beam") return val.replace("°", "");
    if (type === "ip-rating") return val.replace("ip", "");
    if (type === "finish") {
      if (val.startsWith("ral")) {
        return "RAL" + val.replace("ral", "").replace(/\s+/g, "");
      }
      const colorMap = {
        "white": "WH",
        "black": "BK",
        "grey": "GR",
        "gray": "GR",
        "silver": "SV",
        "satin-nickel": "SN"
      };
      return colorMap[val] || val.toUpperCase();
    }
    return val;
  }

  // === Get Text Value for a Dropdown ===
  function getTextValue(type) {
    const el = document.querySelector(`.dropdown-wrapper[data-type="${type}"] .selected-value`);
    if (!el) return null;
    if (type === "finish" && window.currentSelection.finish?.startsWith("RAL")) {
      return window.currentSelection.finish;
    }
    return normalizeValue(type, el.textContent.trim());
  }

  // === Generate & Display Ordering Code ===
  function updateOrderingCode() {
    const baseCode = window.currentSelection.product || "CXXX";
    const keys = ["watt", "ip-rating", "beam", "cct", "cri", "finish"];
    const labels = ["Wattage", "IP Rating", "Beam", "CCT", "CRI", "Finish"];
    const codeElement = document.querySelector(".ordering-code-value");

    if (codeElement) {
      const styledParts = keys.map((key, i) => {
        const val = getTextValue(key) || "XX";
        const defaultVal = window.currentSelection.defaults?.[key] || "XX";
        const isDefault = val === defaultVal;
        const color = isDefault ? "#999" : "#C0392B";
        return `<span title="${labels[i]}" style="color:${color}; font-weight: bold;">${val}</span>`;
      });

      codeElement.innerHTML = `<span title="Product Code" style="color: #111; font-weight: bold;">${baseCode}</span>.` + styledParts.join(".");
    }
  }

  // === Trigger Initial Update on Load ===
  setTimeout(() => {
    updateLumenValue();
    updateOrderingCode();
  }, 300);
});
// === End Product Configurator Script === //

// === DUVA Product Page Logic Script === //
document.addEventListener("DOMContentLoaded", function () {

  /* === Main Image Thumbnail Click Logic === */
  const mainImage = document.getElementById("main-lightbox-trigger");
  const thumbnails = document.querySelectorAll(".thumbnail-image");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const newSrc = this.getAttribute("src");
      if (mainImage && newSrc) {
        mainImage.setAttribute("src", newSrc);
      }

      // Update active state
      thumbnails.forEach(t => t.classList.remove("is-active"));
      this.classList.add("is-active");
    });
  });

  /* === Trigger Hidden Webflow Lightbox Gallery === */
  const firstGalleryItem = document.querySelector(".first-gallery-image");
  if (mainImage && firstGalleryItem) {
    mainImage.addEventListener("click", () => {
      firstGalleryItem.click();
    });
  }

  /* === Dropdown + Configurator Logic === */
  const dropdowns = document.querySelectorAll(".dropdown-wrapper");
  const ralInput = document.querySelector("#ral-input");

  // RAL input styling and default setup
  if (ralInput) {
    ralInput.style.display = "none";
    ralInput.textContent = "Enter RAL number here";
    ralInput.setAttribute("contenteditable", "true");
    ralInput.style.color = "#999";
    ralInput.style.padding = "6px 8px";
    ralInput.style.minHeight = "48px";
    ralInput.style.backgroundColor = "#f8f8f8";
    ralInput.style.borderRadius = "6px";
    ralInput.style.cursor = "text";
  }

  // Global selection state
  window.currentSelection = {
    product: document.querySelector("#product-code-heading")?.textContent.trim() || null,
    watt: null,
    cct: null,
    cri: null,
    finish: null,
    defaults: {}
  };

  /* === Reset Button Logic === */
  const resetButton = document.querySelector(".reset-button");
  if (resetButton) {
    resetButton.style.display = "flex";
    resetButton.style.alignItems = "center";
    resetButton.style.justifyContent = "center";

    resetButton.addEventListener("click", () => {
      dropdowns.forEach(dropdown => {
        const type = dropdown.getAttribute("data-type");
        const selected = dropdown.querySelector(".selected-value");
        const source = dropdown.querySelector(".dropdown-source");
        if (!type || !selected || !source) return;

        const values = source.textContent.split(",").map(v => v.trim()).filter(Boolean);
        const firstValue = values[0] || "XX";

        selected.textContent = firstValue;
        window.currentSelection[type] = firstValue;
        window.currentSelection.defaults[type] = normalizeValue(type, firstValue);

        if (type === "finish") {
          if (firstValue.toLowerCase() === "ral") {
            ralInput.style.display = "block";
          } else {
            ralInput.style.display = "none";
          }
        }
      });

      updateLumenValue();
      updateOrderingCode();
    });
  }

  /* === Initialize Each Dropdown === */
  dropdowns.forEach(dropdown => {
    const type = dropdown.getAttribute("data-type");
    const field = dropdown.querySelector(".dropdown-field");
    const selected = dropdown.querySelector(".selected-value");
    const source = dropdown.querySelector(".dropdown-source");
    const arrow = dropdown.querySelector(".dropdown-arrow");

    if (!field || !selected || !source) return;

    const values = source.textContent.split(",").map(v => v.trim()).filter(v =>
      v && !["na", "n/a", "none", "0", "--"].includes(v.toLowerCase())
    );

    if (type === "lumen" || values.length === 0) {
      dropdown.closest(".spec-row")?.remove();
      return;
    }

    selected.textContent = values[0] || "N/A";
    window.currentSelection[type] = values[0];
    window.currentSelection.defaults[type] = normalizeValue(type, values[0]);

    if (values.length <= 1) {
      dropdown.classList.add("disabled");
      arrow && (arrow.style.display = "none");
      return;
    }

    const optionsBox = document.createElement("div");
    optionsBox.className = "dropdown-options";
    dropdown.appendChild(optionsBox);

    values.forEach(value => {
      const opt = document.createElement("div");
      opt.className = "dropdown-option";
      opt.textContent = value;

      opt.addEventListener("click", () => {
        if (selected.textContent === value) return;

        selected.textContent = value;
        optionsBox.style.display = "none";
        dropdown.classList.remove("open");

        if (type === "finish" && value.toLowerCase() === "ral") {
          ralInput.style.display = "block";
          ralInput.textContent = "Enter RAL number here";
          ralInput.style.color = "#999";

          ralInput.addEventListener("focus", () => {
            if (ralInput.textContent === "Enter RAL number here") {
              ralInput.textContent = "";
              ralInput.style.color = "#111";
            }
          });

          ralInput.addEventListener("input", () => {
            const typedRAL = ralInput.textContent.trim();
            window.currentSelection.finish = typedRAL ? "RAL" + typedRAL : "RAL";
            updateOrderingCode();
          });

          window.currentSelection.finish = "RAL";
        } else {
          ralInput.style.display = "none";
          window.currentSelection[type] = value;
        }

        updateLumenValue();
        updateOrderingCode();
      });

      optionsBox.appendChild(opt);
    });

    // Arrow toggle
    arrow?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = optionsBox.style.display === "block";
      document.querySelectorAll(".dropdown-options").forEach(opt => opt.style.display = "none");
      document.querySelectorAll(".dropdown-wrapper").forEach(d => d.classList.remove("open"));

      if (!isOpen) {
        optionsBox.style.display = "block";
        dropdown.classList.add("open");
      }
    });

    // Close all dropdowns on outside click
    document.addEventListener("click", () => {
      optionsBox.style.display = "none";
      dropdown.classList.remove("open");
    });
  });

  /* === Update Lumen Value === */
  function updateLumenValue() {
    const { product, watt, cct, cri } = window.currentSelection;
    const match = Array.from(document.querySelectorAll(".lumen-cms-data")).find(el =>
      el.dataset.product === product &&
      el.dataset.watt === watt &&
      el.dataset.cct === cct &&
      (!el.dataset.cri || el.dataset.cri === cri)
    );

    const lumenEl = document.querySelector('[data-type="lumen"] .selected-value');

    if (match && lumenEl) {
      lumenEl.textContent = match.dataset.lumen;
      lumenEl.style.color = "#111";
      lumenEl.style.fontWeight = "bold";
    } else if (lumenEl) {
      lumenEl.textContent = "Not Available";
      lumenEl.style.color = "red";
      lumenEl.style.fontWeight = "bold";
    }
  }

  /* === Normalize Value for Code Generation === */
  function normalizeValue(type, val) {
    val = val?.toLowerCase();
    if (!val) return "XX";
    if (type === "cct") return val.replace("k", "").substring(0, 2);
    if (type === "beam") return val.replace("°", "");
    if (type === "ip-rating") return val.replace("ip", "");
    if (type === "finish") {
      if (val.startsWith("ral")) return "RAL" + val.replace("ral", "").replace(/\s+/g, "");
      const map = { white: "WH", black: "BK", grey: "GR", gray: "GR", silver: "SV", "satin-nickel": "SN" };
      return map[val] || val.toUpperCase();
    }
    return val;
  }

  /* === Get Normalized Value for Each Field === */
  function getTextValue(type) {
    const el = document.querySelector(`.dropdown-wrapper[data-type="${type}"] .selected-value`);
    if (!el) return null;
    if (type === "finish" && window.currentSelection.finish?.startsWith("RAL")) {
      return window.currentSelection.finish;
    }
    return normalizeValue(type, el.textContent.trim());
  }

  /* === Update Ordering Code Display === */
  function updateOrderingCode() {
    const baseCode = window.currentSelection.product || "CXXX";
    const keys = ["watt", "ip-rating", "beam", "cct", "cri", "finish"];
    const labels = ["Wattage", "IP Rating", "Beam", "CCT", "CRI", "Finish"];
    const codeEl = document.querySelector(".ordering-code-value");

    if (codeEl) {
      const parts = keys.map((key, i) => {
        const val = getTextValue(key) || "XX";
        const isDefault = val === window.currentSelection.defaults?.[key];
        const color = isDefault ? "#999" : "#C0392B";
        return `<span title="${labels[i]}" style="color:${color}; font-weight: bold;">${val}</span>`;
      });

      codeEl.innerHTML = `<span title="Product Code" style="color: #111; font-weight: bold;">${baseCode}</span>.${parts.join(".")}`;
    }
  }

  // Initial update after load
  setTimeout(() => {
    updateLumenValue();
    updateOrderingCode();
  }, 300);

});
// === End DUVA Product Page Script === //

// === DUVA Download Panel & Divider Script === //
document.addEventListener('DOMContentLoaded', function () {

  /* === Get Product Code Based on Current Selection === */
  function getProductCode() {
    const selection = window.currentSelection || {};
    const code = selection.code || 'C329';
    const watt = selection.watt || '12';
    const ip = selection.ip || '65';
    const beam = selection.beam || '30';

    const cctMap = { '2700K': '27', '3000K': '30', '4000K': '40', '5000K': '50' };
    const finishMap = { 'White': 'WH', 'Black': 'BK', 'Grey': 'GR', 'Silver': 'SV' };

    let cct = selection.cct || '30';
    let cri = selection.cri || '80';
    let finish = selection.finish || 'BK';

    cct = cctMap[cct] || cct.replace('K', '');
    finish = finishMap[finish] || finish;

    return `${code}.${watt}.${ip}.${beam}.${cct}.${cri}.${finish}`;
  }

  /* === Inject PDF Datasheet URL into First Row === */
  const datasheetCode = getProductCode();
  const datasheetUrl = `https://duva-lighting.com/pdfs/${datasheetCode}.pdf`;

  const firstRow = document.querySelector('.download-row');
  if (firstRow) {
    const fileDiv = firstRow.querySelector('[data-file]');
    if (fileDiv) {
      fileDiv.setAttribute('data-file', datasheetUrl);
      firstRow.setAttribute('data-type', 'pdf');
    }
  }

  function updateDatasheetRow() {
    const code = getProductCode();
    const newUrl = `https://duva-lighting.com/pdfs/${code}.pdf`;
    const row = document.querySelector('.download-row');
    const fileDiv = row?.querySelector('[data-file]');
    if (fileDiv) {
      fileDiv.setAttribute('data-file', newUrl);
    }
  }

  /* === Watch for Selection Changes and Update File URL === */
  document.querySelectorAll('.selected-value').forEach(item => {
    item.addEventListener('DOMSubtreeModified', () => {
      updateDatasheetRow();

      const selection = window.currentSelection || {};
      const row = item.closest('.spec-row');
      if (!row) return;

      const type = row.getAttribute('data-type');
      const value = item.textContent.trim();

      if (type) {
        selection[type] = value;
        window.currentSelection = selection;
      }
    });
  });

  /* === Generate PDF Datasheet Dynamically === */
  function generatePDF(productCode) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const selection = window.currentSelection || {};
    const watt = selection.watt || '12';
    const cct = selection.cct || '30';
    const cri = selection.cri || '80';
    const finish = selection.finish || 'BK';
    const lumen = selection.lumen || '960';
    const voltage = selection.voltage || '220-240V';

    const displayCCT = cct.includes('K') ? cct : `${cct}K`;
    const displayFinish = {
      BK: 'Black', WH: 'White', GR: 'Grey', SV: 'Silver'
    }[finish] || finish;

    doc.setFontSize(16);
    doc.text('DUVA Lighting – Product Datasheet', 20, 20);

    doc.setFontSize(12);
    doc.text(`Product Code: ${productCode}`, 20, 40);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 50);

    doc.text('Details:', 20, 70);
    doc.text('- Light Source: LED', 30, 80);
    doc.text(`- Power: ${watt}W`, 30, 90);
    doc.text(`- CCT: ${displayCCT}`, 30, 100);
    doc.text(`- CRI: ${cri}`, 30, 110);
    doc.text(`- Finish: ${displayFinish}`, 30, 120);
    doc.text(`- Luminous Flux: ${lumen} lm`, 30, 130);
    doc.text(`- Input Voltage: ${voltage}`, 30, 140);

    doc.save(`${productCode}.pdf`);
  }

  /* === Hide Rows with Missing Files === */
  document.querySelectorAll('.download-row').forEach(row => {
    const fileDiv = row.querySelector('[data-file]');
    const fileUrl = fileDiv?.getAttribute('data-file');
    const divider = row.nextElementSibling?.classList.contains('download-divider') ? row.nextElementSibling : null;

    if (!fileUrl || fileUrl === 'null' || fileUrl === '0') {
      row.style.display = 'none';
      if (divider) divider.style.display = 'none';
    } else {
      const fileExtension = fileUrl.split('.').pop().toLowerCase();
      row.setAttribute('data-type', fileExtension);
    }
  });

  /* === Toggle Checkbox Active Class === */
  document.querySelectorAll('.download-checkbox').forEach(box => {
    box.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  /* === Download Selected Files === */
  document.querySelector('#download-selected')?.addEventListener('click', function () {
    const selectedBoxes = document.querySelectorAll('.download-checkbox.active');
    const selectedFiles = [];

    selectedBoxes.forEach(box => {
      const row = box.closest('.download-row');
      if (!row || row.offsetParent === null) return;

      const fileDiv = row.querySelector('[data-file]');
      const fileUrl = fileDiv?.getAttribute('data-file');
      if (fileUrl) {
        selectedFiles.push(fileUrl);
      }
    });

    if (selectedFiles.length === 0) {
      alert('No files selected!');
      return;
    }

    selectedFiles.forEach(url => {
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  });

  /* === Download All Files === */
  document.querySelector('#download-all')?.addEventListener('click', () => {
    document.querySelectorAll('.download-row').forEach(row => {
      if (row.offsetParent === null) return;

      const fileDiv = row.querySelector('[data-file]');
      const fileUrl = fileDiv?.getAttribute('data-file');

      if (fileUrl && fileUrl !== 'null' && fileUrl !== '0' && !fileUrl.includes('undefined')) {
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    });
  });

  /* === Handle Arrow Download Buttons === */
  document.querySelectorAll('.download-arrow').forEach(icon => {
    icon.addEventListener('click', function () {
      const row = this.closest('.download-row');
      const isGenerated = row === document.querySelector('.download-row');

      if (isGenerated) {
  generatePDFWithAccessories(); // NEW FUNCTION!
  return;
}

      const fileUrl = this.getAttribute('data-file');
      if (fileUrl) {
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    });
  });

  /* === Inject Accessories Divider (Max Width 2000px) === */
  const accessoriesSection = document.querySelector(".accessories-section");
  if (accessoriesSection) {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.marginTop = "24px";

    const divider = document.createElement("div");
    divider.style.width = "100%";
    divider.style.maxWidth = "2000px";
    divider.style.height = "1px";
    divider.style.backgroundColor = "#e0e0e0";

    wrapper.appendChild(divider);
    accessoriesSection.after(wrapper);
  }

});
// === End DUVA Download Panel & Divider Script === //

// === Accessories Dropdown Toggle Script (Dynamic scrollHeight) === //
  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".accessories-toggle");
    const wrapper = document.querySelector(".accessories-wrapper");
    const arrow = document.querySelector(".accessories-arrow");
    const section = document.querySelector(".accessories-section");

    if (toggle && wrapper && arrow && section) {
      toggle.addEventListener("click", function () {
        const isOpen = section.classList.toggle("open");
        arrow.classList.toggle("rotated");

        if (isOpen) {
          // Expand to actual scroll height
          wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        } else {
          // Collapse
          wrapper.style.maxHeight = "0px";
        }
      });
    }
  });
// === End Accessories Dropdown Toggle Script (Dynamic scrollHeight) === //


// === DUVA Accessories PDF Export Script (Optimized) === //
window.generatePDFWithAccessories = () => {
  const exportTarget = document.querySelector('.pdf-content');
  if (!exportTarget) return alert("Missing .pdf-content container");

  html2pdf().set({
    margin: 10,
    filename: 'DUVA.pdf',
  }).from(exportTarget).save();
};
  // Show container temporarily for PDF rendering
  exportTarget.style.display = 'block';
  exportTarget.style.position = 'static';

  // Clear previous content
  exportTarget.innerHTML = '';

  // Add Title
  const title = document.createElement('h2');
  title.textContent = 'DUVA Lighting – Product Datasheet';
  title.style.fontSize = '18px';
  title.style.marginBottom = '20px';
  exportTarget.appendChild(title);

  // Add Product Code
  const code = document.querySelector('.ordering-code-value')?.textContent.trim() || 'Unknown';
  const codeText = document.createElement('p');
  codeText.textContent = `Product Code: ${code}`;
  exportTarget.appendChild(codeText);

  // Add Accessories Section Title
  const sectionTitle = document.createElement('h3');
  sectionTitle.textContent = 'Selected Accessories';
  sectionTitle.style.color = '#c0392b';
  sectionTitle.style.margin = '20px 0 10px';
  exportTarget.appendChild(sectionTitle);

  // Get Selected Accessories
  const selected = Array.from(document.querySelectorAll('.download-checkbox.selected'));

  selected.forEach(div => {
    const name = div.getAttribute('data-name') || 'undefined';
    const code = div.getAttribute('data-code') || 'undefined';

    const wrapper = document.createElement('div');
    wrapper.style.border = '1px solid #ccc';
    wrapper.style.padding = '12px';
    wrapper.style.margin = '10px 0';

    const nameEl = document.createElement('strong');
    nameEl.textContent = name;
    wrapper.appendChild(nameEl);

    const codeEl = document.createElement('div');
    codeEl.textContent = `Code: ${code}`;
    wrapper.appendChild(codeEl);

    exportTarget.appendChild(wrapper);
  });

  // Generate and download PDF
  setTimeout(() => {
    html2pdf().set({
      margin: 10,
      filename: `${code}.pdf`
    }).from(exportTarget).save();
  }, 300);
};
// === End DUVA Accessories PDF Export Script === //
