import {
  LoaderFunction,
  LoaderFunctionArgs,
  Navigate,
  Params,
} from "react-router-dom";
import Layout from "../layout/Layout";
import { DashboardPage } from "../pages/dashboard/Dashboard";
import RoleGuard from "./RoleGuard";
import { getProcess, getStudentById } from "../services/processServicer";
import CreateProcessPage from "../pages/CreateGraduation/CreateProcessPage";
import CreateEventPage from "../pages/Events/CreateEventPage";
import EventsPage from "../pages/Events/EventsPage";
import UpdateEventForm from "../pages/Events/UpdateEventForm";
import GraduationProcessPage from "../pages/graduation/GraduationProcessPage";
import ProcessInfoPage from "../pages/graduation/ProcessInfoPage";
import InternsListPage from "../pages/interns/InternsListPage";
import CreateProfessorPage from "../pages/Professor/CreateProfessorPage";
import ProfessorPage from "../pages/Professor/ProfessorPage";
import Profile from "../pages/profile/Profile";
import CreateStudentPage from "../pages/Student/CreateStudentPage";
import EditStudentPage from "../pages/Student/EditStudentPage";
import StudentPage from "../pages/Student/StudentsPage";
import HoursPage from "../pages/ScholarshipHours/HoursPage";
import EventTable from "../pages/Events/EventTable";
import CompleteScholarshipHourPage from "../pages/CompleteScholarshipHour/CompleteScholarshipHourPage";
import RegistrationEvent from "../components/cards/RegistrationEvent";
import MyEventsTable from "../pages/interns/MyEventsTable";
import "../style.css";
import UsersPage from "../pages/Users/UsersPage";
import AdministratorPage from "../pages/Administrator/AdministratorPage";

function loader() {
  return getProcess();
}

interface StudentParams extends Params {
  id: string;
}

const getStudentProcess: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs<StudentParams>) => {
  const studentId = Number(params.id);
  return getStudentById(studentId);
};

const protectedRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/dashboard",
        element: (
          <RoleGuard allowedRoles={["admin", "student", "professor"]}>
            <DashboardPage />
          </RoleGuard>
        ),
      },
      {
        path: "/process",
        loader: loader,
        element: (
          <RoleGuard allowedRoles={["admin", "professor"]}>
            <GraduationProcessPage />
          </RoleGuard>
        ),
      },
      {
        path: "/professors",
        loader: loader,
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <ProfessorPage />
          </RoleGuard>
        ),
      },
      {
        path: "/students",
        loader: loader,
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <StudentPage />
          </RoleGuard>
        ),
      },
      {
        path: "/edit-student/:id",
        element: (
          <RoleGuard allowedRoles={["admin", "professor"]}>
            <EditStudentPage />
          </RoleGuard>
        ),
      },
      {
        path: "/create-professor",
        loader: loader,
        element: (
          <RoleGuard allowedRoles={["admin"]}>
            <CreateProfessorPage />
          </RoleGuard>
        ),
      },
      {
        path: "/create-student",
        loader: loader,
        element: (
          <RoleGuard allowedRoles={["admin", "professor"]}>
            <CreateStudentPage />
          </RoleGuard>
        ),
      },
      {
        path: "/studentProfile/:id",
        loader: getStudentProcess,
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <ProcessInfoPage />
          </RoleGuard>
        ),
      },
      {
        path: "/createProcess",
        loader: loader,
        element: (
          <RoleGuard allowedRoles={["admin", "professor"]}>
            <CreateProcessPage />
          </RoleGuard>
        ),
      },
      {
        path: "/profile",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <Profile />
          </RoleGuard>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <RoleGuard allowedRoles={["admin", "student", "professor"]}>
            <Profile />
          </RoleGuard>
        ),
      },
      {
        path: "/events",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <EventsPage />
          </RoleGuard>
        ),
      },
      {
        path: "/events/create",
        element: (
          <RoleGuard allowedRoles={["admin", "professor"]}>
            <CreateEventPage />
          </RoleGuard>
        ),
      },
      {
        path: "/interns",
        element: (
          <RoleGuard allowedRoles={["admin", "professor"]}>
            <InternsListPage />
          </RoleGuard>
        ),
      },
      {
        path: "/editEvent/:id_event",
        element: (
          <RoleGuard allowedRoles={["admin", "professor"]}>
            <UpdateEventForm />
          </RoleGuard>
        ),
      },
      {
        path: "/registrationEvent/:id_event",
        element: (
          <RoleGuard allowedRoles={["admin", "professor"]}>
            <RegistrationEvent />
          </RoleGuard>
        ),
      },
      {
        path: "/scholarshipHours",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <HoursPage />
          </RoleGuard>
        ),
      },
      {
        path: "/programDirector",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <EventTable />
          </RoleGuard>
        ),
      },
      {
        path: "/CompleteScholarshipHour",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <CompleteScholarshipHourPage />
          </RoleGuard>
        ),
      },
      {
        path: "/myEvents",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <MyEventsTable />
          </RoleGuard>
        ),
      },
      {
        path: "/administration",
        element: (
          <AdministratorPage/>
        )
      },
      {
        path: "/users",
        element: (
          <UsersPage/>
        )
      }
    ],
  },
];

export default protectedRoutes;
