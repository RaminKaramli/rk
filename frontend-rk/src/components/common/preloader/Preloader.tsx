type PreloaderProps = {
  visible: boolean
}

export default function Preloader({ visible }: PreloaderProps) {
  if (!visible) {
    return null
  }

  return (
    <div className="loading-overlay" aria-hidden="true">
      <div className="loading-track">
        <div className="loading-bar" />
      </div>
    </div>
  )
}
