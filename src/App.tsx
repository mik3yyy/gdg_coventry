
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import { AuthProvider } from './contexts/AuthContext'
import { OrganizerProvider } from "./contexts/OrganizerContext"
import { ProjectProvider } from './contexts/ProjectContext'
import { EventsProvider } from './contexts/EventsProvider'
import { MentorProvider } from './contexts/MentorContext'
import { OpportunitiesProvider } from './contexts/OppurtunityContext'
import { AchievementProvider } from './contexts/AchievementContext'
import { ResourcesProvider } from './contexts/ResourceContext'

function App() {
  return (
    <AuthProvider>
      <OrganizerProvider>
        <ProjectProvider>
          <MentorProvider>
            <OpportunitiesProvider>
              <EventsProvider>
                <AchievementProvider>
                  <ResourcesProvider>
                    <BrowserRouter basename={__BASE_PATH__}>
                      <AppRoutes />
                    </BrowserRouter>
                  </ResourcesProvider>
                </AchievementProvider>
              </EventsProvider>
            </OpportunitiesProvider>
          </MentorProvider>
        </ProjectProvider>

      </OrganizerProvider>

    </AuthProvider >
  )
}

export default App
