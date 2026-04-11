import Container from '../../components/layout/container/Container'

export default function NotFoundPage() {
  return (
    <Container page="home" title="404 | RK Project">
      <section className="page-placeholder">
        <div className="page-placeholder__inner">
          <h1>404</h1>
          <p>Page not found.</p>
        </div>
      </section>
    </Container>
  )
}
