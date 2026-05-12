import { useState, useEffect } from 'react';
import { getPrimaryColor, applyPrimaryColor } from '../../utils/theme';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [primaryColor, setPrimaryColor] = useState(getPrimaryColor());

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setPrimaryColor(newColor);
    applyPrimaryColor(newColor);
  };

  const handleReset = () => {
    const defaultColor = '#3949FE';
    setPrimaryColor(defaultColor);
    applyPrimaryColor(defaultColor);
  };

  return (
    <div className="adminDashboard">
      {/* Sidebar */}
      <aside className="adminSidebar">
        <div className="adminBrand">
          <div className="adminBrandIcon"><i className="ri-settings-4-fill"></i></div>
          <span className="adminBrandText">Admin Panel</span>
        </div>
        <nav className="adminNav">
          <button className="adminNavItem active">
            <i className="ri-palette-line"></i>
            UI Color
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="adminMain">
        <header className="adminHeader">
          <h1 className="adminTitle">Theme Settings</h1>
        </header>

        <div className="adminContent">
          <section className="adminSection">
            <h2 className="adminSectionTitle">Primary Brand Color</h2>
            <p className="adminSectionDesc">
              This color is used for primary buttons, active tabs, and highlights across the app.
            </p>

            <div className="colorControlCard">
              <div className="colorPreview" style={{ backgroundColor: primaryColor }}></div>
              <div className="colorPickerWrapper">
                <label htmlFor="primaryColorPicker" className="colorLabel">Select Color (Hex)</label>
                <div className="colorInputGroup">
                  <input
                    type="color"
                    id="primaryColorPicker"
                    className="colorPicker"
                    value={primaryColor}
                    onChange={handleColorChange}
                  />
                  <input
                    type="text"
                    className="colorHexInput"
                    value={primaryColor.toUpperCase()}
                    onChange={handleColorChange}
                    maxLength={7}
                  />
                </div>
              </div>
              <button className="resetColorBtn" onClick={handleReset}>
                Reset to Default
              </button>
            </div>
            
            <div className="themePreviewArea">
              <h3>Live Preview</h3>
              <div className="previewBox">
                <button className="previewBtnPrimary" style={{ background: primaryColor }}>Primary Button</button>
                <div className="previewText" style={{ color: primaryColor }}>Brand Accent Text</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
