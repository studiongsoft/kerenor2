---
name: react-functional-components
description: >
  Use this skill whenever writing or refactoring React components. Always prefer
  functional components with hooks over class components. Trigger whenever the user
  asks to create a React component, refactor or convert a class component, add state
  or lifecycle behavior to a component, or write any React UI code. Do NOT use class
  components (React.Component / PureComponent) unless the user explicitly requests
  them or the codebase requires it (e.g., error boundaries that have no hooks API yet).
---

# React Functional Components

Always write React components as **functions**, not classes. Use hooks for state and
lifecycle behavior.

---

## Core Rules

1. **No class components** — never use `class Foo extends React.Component`.
2. **Props via destructuring** — destructure in the function signature.
3. **State via `useState`** — one hook per logical state value.
4. **Side effects via `useEffect`** — replaces `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`.
5. **Memoization** — `useMemo` for expensive computed values, `useCallback` for stable function references.
6. **Default export** — export the component as the default export unless there's a strong reason not to.

---

## Class → Functional Conversion Reference

| Class pattern | Functional equivalent |
|---|---|
| `this.state = { x }` | `const [x, setX] = useState(initialValue)` |
| `this.setState({ x })` | `setX(newValue)` |
| `componentDidMount` | `useEffect(() => { ... }, [])` |
| `componentDidUpdate(prevProps)` | `useEffect(() => { ... }, [dep1, dep2])` |
| `componentWillUnmount` | `useEffect(() => { return () => cleanup() }, [])` |
| `this.props.foo` | destructure `{ foo }` from function params |
| `shouldComponentUpdate` | `React.memo(Component)` |
| `createRef` | `useRef(null)` |
| `getDerivedStateFromProps` | compute inline or in `useMemo` |
| `getSnapshotBeforeUpdate` | `useLayoutEffect` + ref |

---

## Patterns

### Basic component with props
```jsx
// ✅ Correct
function Greeting({ name, onDismiss }) {
  return <button onClick={onDismiss}>Hello, {name}!</button>;
}

// ❌ Avoid
class Greeting extends React.Component {
  render() {
    return <button onClick={this.props.onDismiss}>Hello, {this.props.name}!</button>;
  }
}
```

### State
```jsx
function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}
```

### Side effects
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchUser(userId).then(data => {
      if (!cancelled) setUser(data);
    });
    return () => { cancelled = true; };  // cleanup
  }, [userId]);  // re-run when userId changes

  if (!user) return <p>Loading…</p>;
  return <p>{user.name}</p>;
}
```

### Forwarding refs
```jsx
const Input = React.forwardRef(function Input({ label, ...props }, ref) {
  return (
    <label>
      {label}
      <input ref={ref} {...props} />
    </label>
  );
});
```

### Memoization
```jsx
// Avoid re-renders when props haven't changed
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
});

// Stable callback reference for child components
function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => setCount(c => c + 1), []);
  return <ExpensiveList onAdd={handleClick} />;
}
```

### Custom hooks — extract reusable logic
```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}

// Usage
function Banner() {
  const { width } = useWindowSize();
  return <p>{width < 600 ? 'Mobile' : 'Desktop'}</p>;
}
```

---

## Exception: Error Boundaries

React's error boundary API (`componentDidCatch`, `getDerivedStateFromError`) has **no hooks
equivalent**. This is the one valid use of a class component:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { logError(err, info); }
  render() {
    return this.state.hasError ? <p>Something went wrong.</p> : this.props.children;
  }
}
```

Wrap functional trees in an `ErrorBoundary` where needed; keep all other components functional.

---

## Checklist When Refactoring a Class Component

- [ ] Replace `extends React.Component` with `function ComponentName(props)`
- [ ] Destructure all `this.props.*` references in the function signature
- [ ] Convert each `this.state` field to a separate `useState` call
- [ ] Replace `this.setState` with the corresponding setter
- [ ] Convert lifecycle methods to `useEffect` (match deps carefully)
- [ ] Replace `createRef` with `useRef`
- [ ] Wrap in `React.memo` if `shouldComponentUpdate` or `PureComponent` was used
- [ ] Extract any repeated stateful logic into a custom hook
- [ ] Remove `render()` method — just `return` from the function body
