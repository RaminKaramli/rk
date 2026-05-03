import { stackCards } from '../../data/projects'

export default function StackCardsShowcase() {
  return (
    <section id="about" className="stack-cards-section">
      <div className="projects-grid">
        {stackCards.map((card) => (
          <div key={card.alt} className="projects-grid__item">
            <img className="projects-grid__image" src={card.image} alt={card.alt} />
          </div>
        ))}
      </div>
    </section>
  )
}
