import SmoothScroller from '@/components/SmoothScroller'
import SovereignLayout from '@/components/layout/SovereignLayout'
import HeroEventHorizon from '@/components/stitch/HeroEventHorizon'
import SectionOracle from '@/components/stitch/SectionOracle'
import SectionDimensionalStack from '@/components/stitch/SectionDimensionalStack'
import SectionChaosOrder from '@/components/stitch/SectionChaosOrder'

function App() {
  return (
    <>
      <SmoothScroller />
      <SovereignLayout>
        <main className="bg-void text-platinum antialiased font-sans">
          <HeroEventHorizon />
          <SectionOracle />
          <SectionDimensionalStack />
          <SectionChaosOrder />
        </main>
      </SovereignLayout>
    </>
  )
}

export default App
