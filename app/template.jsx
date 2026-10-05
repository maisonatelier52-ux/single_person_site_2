// A template (unlike a layout) is re-created on every navigation, so each page fades in.
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}
