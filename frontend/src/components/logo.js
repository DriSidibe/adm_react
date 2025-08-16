// components/Logo.jsx
export default function Logo({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      {/* Your logo SVG path here */}
      <circle cx="50" cy="50" r="40" fill="#3b82f6" />
    </svg>
  );
}