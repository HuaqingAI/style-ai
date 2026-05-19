```markdown
# style-ai Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill introduces the development patterns, coding conventions, and core workflows used in the `style-ai` repository. The project is a React-based JavaScript application focused on design prototyping, scenario development, and asset management. It emphasizes structured file organization, clear workflow documentation, and consistent code style to streamline collaboration and maintainability.

## Coding Conventions

### File Naming
- **Component files** use **PascalCase**.
  - Example: `UserProfile.js`, `ScenarioStep.jsx`
- **Test files** follow the pattern: `*.test.*`
  - Example: `UserProfile.test.js`

### Imports
- Use **relative imports** for internal modules.
  ```javascript
  import { Button } from '../components/Button';
  import ScenarioStep from './ScenarioStep';
  ```

### Exports
- Prefer **named exports**.
  ```javascript
  // Good
  export const ScenarioStep = () => { ... };

  // Also acceptable
  export { ScenarioStep };

  // Avoid default exports
  // export default ScenarioStep; // Not preferred
  ```

### Commit Messages
- Use prefixes: `docs:`, `chore:`, `feat:`
- Keep messages concise (~41 characters on average)
  - Example: `feat: add new scenario step handler`

## Workflows

### Prototype Scenario Development
**Trigger:** When adding or updating a user flow or scenario prototype  
**Command:** `/new-prototype-scenario`

1. Edit or add UX scenario markdown in `_bmad-output/C-UX-Scenarios/[scenario]/[step].md`
2. Update or create prototype HTML and assets in `_bmad-output/P-Prototypes/[scenario]-Prototype/[step].html` and related files
3. Update or add work YAMLs in `_bmad-output/P-Prototypes/[scenario]-Prototype/work/[step]-Work.yaml`
4. Update or add test scripts/results in `_bmad-output/P-Prototypes/[scenario]-Prototype/testing/[test-folder]/`
5. Update `Logical-View-Map.md` and/or `PROTOTYPE-ROADMAP.md` as needed
6. Log progress in `_bmad-output/_progress/00-design-log.md`

**Example file structure:**
```
_bmad-output/
  C-UX-Scenarios/
    Login/
      Step1.md
  P-Prototypes/
    Login-Prototype/
      Step1.html
      work/
        Step1-Work.yaml
      testing/
        Step1Test/
  _progress/
    00-design-log.md
```

---

### Design Delivery Documentation
**Trigger:** When preparing or documenting a delivery/handoff milestone  
**Command:** `/package-delivery`

1. Add or update delivery YAML in `deliveries/DD-XXX-*.yaml`
2. Add or update handoff log in `deliveries/DD-XXX-handoff-log.md`
3. Add or update test scenario YAML in `test-scenarios/TS-XXX-*.yaml`
4. Update related UX scenario markdowns in `_bmad-output/C-UX-Scenarios/`
5. Log progress in `_bmad-output/_progress/00-design-log.md`

**Example:**
```
deliveries/
  DD-001-handoff-log.md
  DD-001-snapshot.yaml
test-scenarios/
  TS-001-login.yaml
_bmad-output/
  C-UX-Scenarios/
    Login/
      Step1.md
  _progress/
    00-design-log.md
```

---

### Asset Update and Log
**Trigger:** When updating or adding new branding or UI image assets  
**Command:** `/update-asset`

1. Add or update image assets in `_bmad-output/E-Assets/` or `assets/images/`
2. Log the update in `_bmad-output/_progress/00-design-log.md`

**Example:**
```
assets/
  images/
    logo-new.png
_bmad-output/
  E-Assets/
    icons/
      icon-refresh.svg
  _progress/
    00-design-log.md
```

## Testing Patterns

- **Test files** use the pattern: `*.test.*` (e.g., `Component.test.js`)
- **Testing framework** is not explicitly specified; check for `.test.js` files for test coverage.
- **Example test file:**
  ```javascript
  // UserProfile.test.js
  import { render } from '@testing-library/react';
  import { UserProfile } from '../UserProfile';

  test('renders user profile', () => {
    const { getByText } = render(<UserProfile name="Alice" />);
    expect(getByText('Alice')).toBeInTheDocument();
  });
  ```

## Commands

| Command                | Purpose                                             |
|------------------------|-----------------------------------------------------|
| /new-prototype-scenario| Start or update a user scenario prototype workflow  |
| /package-delivery      | Prepare and document a delivery/handoff milestone   |
| /update-asset          | Add or update design/image assets and log the change|
```