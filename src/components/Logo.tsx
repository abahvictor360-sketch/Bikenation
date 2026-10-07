export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path fill="#d71920" d="M32 3 57 17.5v29L32 61 7 46.5v-29z" />
      <path
        fill="#fff"
        d="M22 18h13c6 0 10 3.4 10 8.3 0 3-1.6 5.3-4.2 6.4 3.4 1 5.4 3.6 5.4 7 0 5.3-4.2 8.3-10.8 8.3H22zm8 6v6.2h4.3c2 0 3.2-1.2 3.2-3.1S36.3 24 34.3 24zm0 11.8V42h5c2.2 0 3.5-1.2 3.5-3.1s-1.3-3.1-3.5-3.1z"
      />
    </svg>
  )
}
