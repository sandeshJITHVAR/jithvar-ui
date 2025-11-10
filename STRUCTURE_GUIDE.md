# Component Structure & File Organization

## 📁 Project Structure

```
jithvar-ui/
├── src/
│   ├── components/
│   │   ├── Checkbox/
│   │   │   ├── Checkbox.tsx       (Main component)
│   │   │   ├── Checkbox.css       (Styles)
│   │   │   └── index.ts           (Export)
│   │   │
│   │   ├── CheckboxList/
│   │   │   ├── CheckboxList.tsx
│   │   │   ├── CheckboxList.css
│   │   │   └── index.ts
│   │   │
│   │   ├── Radio/
│   │   │   ├── Radio.tsx
│   │   │   ├── Radio.css
│   │   │   └── index.ts
│   │   │
│   │   ├── RadioGroup/
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── RadioGroup.css
│   │   │   └── index.ts
│   │   │
│   │   ├── ToggleButtons/
│   │   │   ├── ToggleButtons.tsx
│   │   │   ├── ToggleButtons.css
│   │   │   └── index.ts
│   │   │
│   │   ├── JAlerts/
│   │   │   ├── JAlerts.tsx
│   │   │   ├── JAlertComponent.tsx
│   │   │   ├── JAlerts.css
│   │   │   └── index.ts
│   │   │
│   │   ├── JTable/
│   │   │   ├── JTable.tsx
│   │   │   ├── JTable.css
│   │   │   └── index.ts
│   │   │
│   │   ├── DatePicker/
│   │   ├── DateRangePicker/
│   │   ├── SearchableSelect/
│   │   └── RangeSlider/
│   │
│   ├── types/
│   │   ├── alerts.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── helpers.ts
│   │
│   └── index.ts              (Main export file)
│
├── demo/
│   ├── pages/
│   │   ├── Dashboard.tsx          (Main landing page)
│   │   ├── Dashboard.css
│   │   ├── CheckboxDemo.tsx
│   │   ├── CheckboxListDemo.tsx
│   │   ├── RadioGroupDemo.tsx
│   │   ├── ToggleButtonsDemo.tsx
│   │   ├── JAlertsDemo.tsx
│   │   ├── JTableDemo.tsx
│   │   ├── DatePickerDemo.tsx
│   │   ├── DateRangePickerDemo.tsx
│   │   ├── SearchableSelectDemo.tsx
│   │   ├── RangeSliderDemo.tsx
│   │   ├── Installation.tsx
│   │   └── ConfigurationGuide.tsx
│   │
│   ├── components/
│   │   ├── CodeBlock.tsx
│   │   ├── DemoButton.tsx
│   │   ├── SkeletonLoader.tsx
│   │   └── ScrollToTop.tsx
│   │
│   ├── App.tsx                    (Main app with routing)
│   ├── demo.css                   (Global styles)
│   ├── main.tsx                   (Entry point)
│   └── mockAPI.ts                 (Mock data for demos)
│
├── dist/                          (Build output)
│   ├── index.js                   (CommonJS)
│   ├── index.esm.js               (ES Modules)
│   └── index.d.ts                 (TypeScript types)
│
├── package.json
├── tsconfig.json
├── rollup.config.js
├── vite.config.ts
└── README.md
```

## 🎯 Component Relationships

```
┌─────────────────────────────────────────────────────┐
│                    Jithvar UI                        │
│                 Component Library                    │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
   ┌────▼────┐                    ┌─────▼─────┐
   │  Input  │                    │   Data    │
   │Components│                   │ Components│
   └────┬────┘                    └─────┬─────┘
        │                               │
   ┌────┴────────────────┐         ┌────┴──────┐
   │                     │         │           │
┌──▼──┐  ┌────▼─────┐  ┌▼────┐   ┌▼────┐  ┌──▼────┐
│Check│  │CheckboxL │  │Radio│   │JTable│  │JAlerts│
│ box │  │   ist    │  │Group│   └─────┘  └───────┘
└─────┘  └──────────┘  └─────┘
   │                      │
   └──────────┬───────────┘
         ┌────▼────┐
         │  Radio  │
         │ Button  │
         └─────────┘

┌────────────────┐     ┌──────────────────┐
│ToggleButtons   │     │ Pickers/Sliders  │
└────────────────┘     └────────┬─────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
              ┌─────▼──┐   ┌────▼────┐  ┌──▼────┐
              │DatePick│   │DateRange│  │Range  │
              │  er    │   │ Picker  │  │Slider │
              └────────┘   └─────────┘  └───────┘

                    ┌──────────────┐
                    │  Searchable  │
                    │    Select    │
                    └──────────────┘
```

## 🎨 Component Composition

### CheckboxList uses Checkbox

```
CheckboxList
├── Checkbox (Select All)
├── Checkbox (Option 1)
├── Checkbox (Option 2)
└── Checkbox (Option 3)
```

### RadioGroup uses Radio

```
RadioGroup
├── Radio (Option 1)
├── Radio (Option 2)
└── Radio (Option 3)
```

### ToggleButtons (Standalone)

```
ToggleButtons
├── Button (Toggle 1)
├── Button (Toggle 2)
└── Button (Toggle 3)
```

## 📋 Demo Page Structure

```
Dashboard (/)
│
├── Input Components Section
│   ├── Checkbox Card → /checkbox
│   ├── CheckboxList Card → /checkbox-list
│   ├── Radio Group Card → /radio-group
│   ├── Toggle Buttons Card → /toggle-buttons
│   └── Searchable Select Card → /searchable-select
│
├── Pickers & Sliders Section
│   ├── Date Picker Card → /date-picker
│   ├── Date Range Picker Card → /date-range-picker
│   └── Range Slider Card → /range-slider
│
├── Data Components Section
│   └── JTable Card → /jtable
│
└── Alerts Section
    └── JAlerts Card → /jalerts
```

## 🔄 Data Flow

### Checkbox Example

```
User Interaction → onChange Event → State Update → Re-render
      ↓
Checkbox Component
├── Controlled (value prop provided)
│   └── Parent manages state
└── Uncontrolled (defaultValue)
    └── Component manages internal state
```

### CheckboxList Example

```
User Clicks Checkbox
      ↓
CheckboxList.handleChange()
      ↓
Update Selected Values Array
      ↓
Call onChange Callback
      ↓
Parent Component Updates
```

### ToggleButtons Example

```
User Clicks Button
      ↓
Single Mode: Replace value
Multiple Mode: Toggle in array
      ↓
Update State
      ↓
Re-render with new selection
```

## 🎯 Style Hierarchy

```
Global Styles (demo.css)
      ↓
Component Styles (*.css)
├── Base styles (.jv-component)
├── Variant styles (.jv-component.variant)
├── Size styles (.jv-component.size)
├── Color styles (.jv-component.color)
└── State styles (.jv-component.disabled, .selected)
```

## 📦 Export Chain

```
Individual Component
      ↓
Component index.ts
      ↓
Main src/index.ts
      ↓
Rollup Build
      ↓
dist/index.js (CommonJS)
dist/index.esm.js (ES Modules)
dist/index.d.ts (Types)
```

## 🚀 Build Process

```
Source Files (src/)
      ↓
TypeScript Compilation
      ↓
Rollup Bundling
├── Tree Shaking
├── CSS Processing
└── Type Generation
      ↓
Distribution Files (dist/)
```

## 🎪 Demo Application Flow

```
User Opens http://localhost:5173
      ↓
Vite Dev Server
      ↓
demo/main.tsx (Entry)
      ↓
demo/App.tsx (Router Setup)
      ↓
      ├── Dashboard.tsx (Home)
      ├── CheckboxDemo.tsx
      ├── CheckboxListDemo.tsx
      ├── RadioGroupDemo.tsx
      ├── ToggleButtonsDemo.tsx
      └── ... (Other Demo Pages)
```

## 🎨 Styling Architecture

```
Component CSS
├── Variables (sizes, colors)
├── Base Styles
├── Variant Styles
│   ├── .default
│   ├── .rounded
│   ├── .square
│   └── .switch (for checkbox)
├── Size Styles
│   ├── .small
│   ├── .medium
│   └── .large
├── Color Styles
│   ├── .primary
│   ├── .success
│   ├── .warning
│   ├── .danger
│   ├── .info
│   └── .purple
├── State Styles
│   ├── :hover
│   ├── :focus
│   ├── :disabled
│   ├── .checked
│   └── .selected
└── Animations
    ├── checkPop
    ├── radioPop
    ├── shimmer
    └── transitions
```

---

This structure ensures:
✅ Clear separation of concerns  
✅ Reusable component patterns  
✅ Easy maintenance and updates  
✅ Scalable architecture  
✅ Type safety throughout  
✅ Efficient builds  
✅ Great developer experience
