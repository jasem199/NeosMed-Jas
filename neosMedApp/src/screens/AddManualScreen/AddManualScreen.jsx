import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UNITS, INTAKE_ADVICE, FREQUENCIES, DURATIONS } from '../../data/mockData';
import './AddManualScreen.css';

const defaultForm = {
  name: '', strength: '', unit: '', intakeAdvice: '',
  frequency: '', times: [], duration: '', durationDays: '',
  stock: '', lowStockThreshold: '', note: '',
};

export default function AddManualScreen() {
  const { setActiveScreen, addMedicine } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // When frequency changes, adjust times array
  const handleFrequencyChange = (freq) => {
    updateField('frequency', freq);
    const defaultTimes = ['08:00', '13:00', '18:00', '22:00'];
    updateField('times', defaultTimes.slice(0, freq));
  };

  const updateTime = (index, value) => {
    setForm(prev => {
      const newTimes = [...prev.times];
      newTimes[index] = value;
      return { ...prev, times: newTimes };
    });
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Medicine name is required';
    if (!form.strength) e.strength = 'Please enter a valid numeric strength';
    if (!form.unit) e.unit = 'Please select a unit';
    if (!form.intakeAdvice) e.intakeAdvice = 'Please select intake advice';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.frequency) e.frequency = 'Please select how many times per day';
    form.times.forEach((t, i) => {
      if (!t) e[`time_${i}`] = `Please set a time for intake ${i + 1}`;
    });
    if (!form.duration) e.duration = 'Please select duration';
    if (form.duration === 'Specific days' && !form.durationDays) e.durationDays = 'Please enter number of days';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e = {};
    if (form.stock && isNaN(Number(form.stock))) e.stock = 'Please enter a valid number';
    if (form.lowStockThreshold && Number(form.lowStockThreshold) > Number(form.stock)) {
      e.lowStockThreshold = 'Reminder threshold cannot be higher than current stock';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else setActiveScreen('home');
  };

  const getTimeCategoriesFromTimes = (times) => {
    return times.map(t => {
      const hour = parseInt(t.split(':')[0]);
      if (hour >= 6 && hour < 12) return 'morning';
      if (hour >= 12 && hour < 17) return 'afternoon';
      if (hour >= 17 && hour < 21) return 'evening';
      return 'night';
    });
  };

  const handleConfirm = () => {
    const newMed = {
      name: form.name,
      strength: Number(form.strength),
      unit: form.unit,
      intakeAdvice: form.intakeAdvice,
      frequency: Number(form.frequency),
      times: form.times,
      timeCategories: getTimeCategoriesFromTimes(form.times),
      duration: form.duration,
      durationDays: form.durationDays ? Number(form.durationDays) : null,
      stock: Number(form.stock) || 0,
      lowStockThreshold: Number(form.lowStockThreshold) || 0,
      note: form.note,
    };
    addMedicine(newMed);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setActiveScreen('home');
    }, 1800);
  };

  const stepLabels = ['Details', 'Schedule', 'Stock & Notes'];

  return (
    <div className="addManualScreen" id="add-manual-screen">
      {/* Top Sticky Section (Header + Indicator) */}
      <div className="addManualTopSection">
        {/* Header */}
        <div className="addManualHeader">
          <button className="addManualBackBtn" onClick={handleBack} aria-label="Go back" id="add-manual-back">
            <i className="ri-arrow-left-line"></i>
          </button>
          <span className="addManualTitle">
            {step <= 3 ? 'Add Medicine' : 'Looks Good?'}
          </span>
        </div>

        {/* Step Indicator */}
        {step <= 3 && (
          <div className="stepIndicator" id="step-indicator">
            {[1, 2, 3].map(s => (
              <span
                key={s}
                className={`stepDot${s === step ? ' active' : ''}${s < step ? ' completed' : ''}`}
              />
            ))}
            <span className="stepLabel">Step {step} of 3 — {stepLabels[step - 1]}</span>
          </div>
        )}
      </div>

      {/* Step 1: Medicine Details */}
      {step === 1 && (
        <div className="stepContent" id="step-1">
          <div className="stepSectionTitle">Medicine Details</div>

          <div className="formField">
            <label className="formLabel">Medicine Name <span className="required">*</span></label>
            <input
              className={`formInput${errors.name ? ' formInputError' : ''}`}
              type="text"
              placeholder="e.g. Amoxicillin"
              value={form.name}
              onChange={e => updateField('name', e.target.value)}
              id="input-med-name"
            />
            {errors.name && <div className="formError">{errors.name}</div>}
          </div>

          <div className="formField">
            <label className="formLabel">Strength <span className="required">*</span></label>
            <input
              className={`formInput${errors.strength ? ' formInputError' : ''}`}
              type="number"
              placeholder="e.g. 500"
              value={form.strength}
              onChange={e => updateField('strength', e.target.value)}
              id="input-strength"
            />
            {errors.strength && <div className="formError">{errors.strength}</div>}
          </div>

          <div className="formField">
            <label className="formLabel">Unit <span className="required">*</span></label>
            <div className={`chipGroup${errors.unit ? ' chipGroupError' : ''}`}>
              {UNITS.map(u => (
                <button
                  key={u}
                  className={`chip${form.unit === u ? ' selected' : ''}`}
                  onClick={() => updateField('unit', u)}
                >
                  {u}
                </button>
              ))}
            </div>
            {errors.unit && <div className="formError">{errors.unit}</div>}
          </div>

          <div className="formField">
            <label className="formLabel">Intake Advice <span className="required">*</span></label>
            <div className={`chipGroup${errors.intakeAdvice ? ' chipGroupError' : ''}`}>
              {INTAKE_ADVICE.map(a => (
                <button
                  key={a}
                  className={`chip${form.intakeAdvice === a ? ' selected' : ''}`}
                  onClick={() => updateField('intakeAdvice', a)}
                >
                  {a}
                </button>
              ))}
            </div>
            {errors.intakeAdvice && <div className="formError">{errors.intakeAdvice}</div>}
          </div>
        </div>
      )}

      {/* Step 2: Schedule */}
      {step === 2 && (
        <div className="stepContent" id="step-2">
          <div className="stepSectionTitle">Schedule</div>

          <div className="formField">
            <label className="formLabel">How many times per day? <span className="required">*</span></label>
            <div className={`chipGroup${errors.frequency ? ' chipGroupError' : ''}`}>
              {FREQUENCIES.map(f => (
                <button
                  key={f}
                  className={`chip${form.frequency === f ? ' selected' : ''}`}
                  onClick={() => handleFrequencyChange(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            {errors.frequency && <div className="formError">{errors.frequency}</div>}
          </div>

          {form.frequency && (
            <div className="formField">
              <label className="formLabel">Intake Times</label>
              <div className="timePickerGroup">
                {form.times.map((t, i) => (
                  <div className="timePickerItem" key={i}>
                    <span className="timePickerLabel">
                      {i === 0 ? 'First intake' : i === 1 ? 'Second intake' : i === 2 ? 'Third intake' : 'Fourth intake'}
                    </span>
                    <input
                      className={`timePickerInput${errors[`time_${i}`] ? ' formInputError' : ''}`}
                      type="time"
                      value={t}
                      onChange={e => updateTime(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="formField">
            <label className="formLabel">Duration <span className="required">*</span></label>
            <div className={`chipGroup${errors.duration ? ' chipGroupError' : ''}`}>
              {DURATIONS.map(d => (
                <button
                  key={d}
                  className={`chip${form.duration === d ? ' selected' : ''}`}
                  onClick={() => updateField('duration', d)}
                >
                  {d}
                </button>
              ))}
            </div>
            {errors.duration && <div className="formError">{errors.duration}</div>}
          </div>

          {form.duration === 'Specific days' && (
            <div className="formField">
              <label className="formLabel">Number of days <span className="required">*</span></label>
              <input
                className={`formInput${errors.durationDays ? ' formInputError' : ''}`}
                type="number"
                placeholder="e.g. 7"
                value={form.durationDays}
                onChange={e => updateField('durationDays', e.target.value)}
              />
              {errors.durationDays && <div className="formError">{errors.durationDays}</div>}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Stock & Notes */}
      {step === 3 && (
        <div className="stepContent" id="step-3">
          <div className="stepSectionTitle">Stock & Notes</div>

          <div className="formField">
            <label className="formLabel">Current stock quantity</label>
            <input
              className={`formInput${errors.stock ? ' formInputError' : ''}`}
              type="number"
              placeholder={`e.g. 30 ${form.unit ? form.unit.toLowerCase() : ''}`}
              value={form.stock}
              onChange={e => updateField('stock', e.target.value)}
              id="input-stock"
            />
            {errors.stock && <div className="formError">{errors.stock}</div>}
          </div>

          <div className="formField">
            <label className="formLabel">Remind me when stock reaches</label>
            <input
              className={`formInput${errors.lowStockThreshold ? ' formInputError' : ''}`}
              type="number"
              placeholder="e.g. 5"
              value={form.lowStockThreshold}
              onChange={e => updateField('lowStockThreshold', e.target.value)}
            />
            <div style={{ fontSize: 12, color: 'var(--color-mute)', marginTop: 4 }}>
              We&apos;ll notify you to restock in time
            </div>
            {errors.lowStockThreshold && <div className="formError">{errors.lowStockThreshold}</div>}
          </div>

          <div className="formField">
            <label className="formLabel">Reason / Note <span className="optional">(Optional)</span></label>
            <input
              className="formInput"
              type="text"
              placeholder="e.g. For throat infection"
              value={form.note}
              onChange={e => updateField('note', e.target.value.slice(0, 100))}
              maxLength={100}
            />
            <div style={{ fontSize: 11, color: 'var(--color-ash)', marginTop: 4, textAlign: 'right' }}>
              {form.note.length}/100
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div className="reviewScreen" id="review-screen">
          <div className="reviewTitle">Looks Good?</div>

          <div className="reviewSection">
            <div className="reviewSectionTitle">Medicine</div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Name</span>
              <span className="reviewRowValue">
                {form.name}
                <button className="reviewEditBtn" onClick={() => setStep(1)} aria-label="Edit name"><i className="ri-pencil-line"></i></button>
              </span>
            </div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Strength</span>
              <span className="reviewRowValue">{form.strength}</span>
            </div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Unit</span>
              <span className="reviewRowValue">{form.unit}</span>
            </div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Intake Advice</span>
              <span className="reviewRowValue">{form.intakeAdvice}</span>
            </div>
          </div>

          <div className="reviewSection">
            <div className="reviewSectionTitle">Schedule</div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Frequency</span>
              <span className="reviewRowValue">
                {form.frequency}x per day
                <button className="reviewEditBtn" onClick={() => setStep(2)} aria-label="Edit schedule"><i className="ri-pencil-line"></i></button>
              </span>
            </div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Times</span>
              <span className="reviewRowValue">{form.times.join(', ')}</span>
            </div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Duration</span>
              <span className="reviewRowValue">
                {form.duration}{form.durationDays ? ` (${form.durationDays} days)` : ''}
              </span>
            </div>
          </div>

          <div className="reviewSection">
            <div className="reviewSectionTitle">Stock & Notes</div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Stock</span>
              <span className="reviewRowValue">
                {form.stock || '—'} {form.unit ? form.unit.toLowerCase() : ''}
                <button className="reviewEditBtn" onClick={() => setStep(3)} aria-label="Edit stock"><i className="ri-pencil-line"></i></button>
              </span>
            </div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Low stock alert</span>
              <span className="reviewRowValue">{form.lowStockThreshold || '—'}</span>
            </div>
            <div className="reviewRow">
              <span className="reviewRowLabel">Note</span>
              <span className="reviewRowValue">{form.note || '—'}</span>
            </div>
          </div>

          <button className="reviewConfirmBtn" onClick={handleConfirm} id="confirm-add-btn">
            Confirm & Add Medicine
          </button>
          <button className="reviewGoBack" onClick={() => setStep(3)}>Go Back</button>
        </div>
      )}

      {/* Step Nav Buttons (Steps 1-3) */}
      {step <= 3 && (
        <div className="stepNavButtons">
          {step > 1 && (
            <button className="stepNavSecondary" onClick={handleBack}>Back</button>
          )}
          <button className="stepNavPrimary" onClick={handleNext} id={`step-${step}-next`}>
            {step === 3 ? 'Review' : 'Next'}
          </button>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="toast" id="success-toast">
          <i className="ri-check-line"></i> Medicine added successfully
        </div>
      )}
    </div>
  );
}
