import { useCanvasEffects } from '../../hooks/useCanvasEffects'

export default function HomeCanvas() {
  useCanvasEffects(true)

  return (
    <>
      <canvas id="canvas" width="100" height="100" />
      <canvas id="canvas2" width="300" height="300" />
      <canvas id="canvas3" width="100" height="100" />
      <canvas id="canvas4" width="100" height="100" />
      <canvas id="canvas5" width="100" height="100" />
    </>
  )
}
