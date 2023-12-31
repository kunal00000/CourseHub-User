import { AppShell, Navbar, SimpleGrid, Text } from "@mantine/core";
import { IconBadges } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useCourses } from "../../hooks/useCourse";
import { useUser } from "../../hooks/useUser";
import { Course } from "../../types/course";
import { MainLinks, Redirect } from "../utilComponents/Redirect";
import { User } from "../utilComponents/User";
import CourseCard from "./CourseCard";

function CourseDashboard() {
  const [username, setUsername] = useState("");

  const { data } = useUser();
  useEffect(() => {
    if (data) {
      setUsername(data);
    }
  }, [data]);
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppShell
        layout="alt"
        padding="md"
        navbar={
          <Navbar
            width={{ base: 280 }}
            height={"98vh"}
            p="xs"
            m={"sm"}
            className="rounded-xl shadow-lg"
          >
            <Navbar.Section mb={36}>
              <Text className="text-2xl font-bold">CourseHub-User</Text>
            </Navbar.Section>
            <Navbar.Section>
              <MainLinks />
            </Navbar.Section>
            <Navbar.Section>
              <Link to={"/dashboard/purchased"}>
                <Redirect
                  icon={<IconBadges />}
                  color={"lime"}
                  label={"Bought Courses"}
                />
              </Link>
            </Navbar.Section>
            <Navbar.Section m={"auto"} mb={0}>
              <User username={username} />
            </Navbar.Section>
          </Navbar>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <CoursePage />
      </AppShell>
    </div>
  );
}

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { data, isLoading } = useCourses();

  useEffect(() => {
    if (!isLoading && data.courses.length > 0) {
      setCourses(data.courses);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Text size={"xl"} m={"xl"} weight={"bolder"}>
        Courses
      </Text>
      <SimpleGrid m={"xl"} cols={3}>
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default CourseDashboard;
