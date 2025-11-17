

import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/home/page';
import AboutPage from '../pages/about/page';
import ProjectsPage from '../pages/projects/page';
import EventsPage from '../pages/events/page';
import CommunityPage from '../pages/community/page';
import ContactPage from '../pages/contact/page';
import SignInPage from '../pages/auth/signin/page';
import DashboardPage from '../pages/dashboard/page';
import SubmitProjectPage from '../pages/dashboard/submit-project/page';
import PostOpportunityPage from '../pages/dashboard/post-opportunity/page';
import BecomeMentorPage from '../pages/dashboard/become-mentor/page';
import MentorsPage from '../pages/dashboard/mentors/page';
import JobsPage from '../pages/dashboard/jobs/page';
import ResourcesPage from '../pages/dashboard/resources/page';
import CertificatePage from '../pages/dashboard/certificate/page';
import AdminDashboard from '../pages/admin/page';
import AdminOrganizersPage from '../pages/admin/organizers/page';
import AdminProjectsPage from '../pages/admin/projects/page';
import AdminJobsPage from '../pages/admin/jobs/page';
import AdminCollaborationsPage from '../pages/admin/collaborations/page';
import AdminMentorsPage from '../pages/admin/mentors/page';
import AdminAchievementsPage from '../pages/admin/achievements/page';
import AdminCertificatesPage from '../pages/admin/certificates/page';
import AdminEventsPage from '../pages/admin/events/page';
import AdminResourcesPage from '../pages/admin/resources/page';
import NotFoundPage from '../pages/NotFound';
import Terms from '../pages/termsandc/terms';
import Privacy from '../pages/termsandc/privacy';
import Code from '../pages/termsandc/code';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/projects',
    element: <ProjectsPage />
  },
  {
    path: '/events',
    element: <EventsPage />
  },
  {
    path: '/community',
    element: <CommunityPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/auth/signin',
    element: <SignInPage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/dashboard/submit-project',
    element: <SubmitProjectPage />
  },
  {
    path: '/dashboard/post-opportunity',
    element: <PostOpportunityPage />
  },
  {
    path: '/dashboard/become-mentor',
    element: <BecomeMentorPage />
  },
  {
    path: '/dashboard/mentors',
    element: <MentorsPage />
  },
  {
    path: '/dashboard/jobs',
    element: <JobsPage />
  },
  {
    path: '/dashboard/resources',
    element: <ResourcesPage />
  },
  {
    path: '/dashboard/certificate',
    element: <CertificatePage />
  },
  {
    path: '/admin',
    element: <AdminDashboard />
  },
  {
    path: '/admin/organizers',
    element: <AdminOrganizersPage />
  },
  {
    path: '/admin/projects',
    element: <AdminProjectsPage />
  },
  {
    path: '/admin/jobs',
    element: <AdminJobsPage />
  },
  {
    path: '/admin/collaborations',
    element: <AdminCollaborationsPage />
  },
  {
    path: '/admin/mentors',
    element: <AdminMentorsPage />
  },
  {
    path: '/admin/achievements',
    element: <AdminAchievementsPage />
  },
  {
    path: '/admin/certificates',
    element: <AdminCertificatesPage />
  },
  {
    path: '/admin/events',
    element: <AdminEventsPage />
  },
  {
    path: '/admin/resources',
    element: <AdminResourcesPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
  {
    path: '/signin',
    element: <SignInPage />
  },
  {
    path: '/auth/signin',
    element: <SignInPage />
  },
  {
    path: '/privacy',
    element: <Privacy />
  },

  {
    path: '/terms',
    element: <Terms />
  },

  {
    path: '/code',
    element: <Code />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default routes;

