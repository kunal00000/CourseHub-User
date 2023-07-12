import { AppShell, Navbar, Text, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import { MainLinks, Redirect } from "../utilComponents/Redirect";
import { User } from "../utilComponents/User";
import { useUser } from "../../hooks/useUser";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import { IconBadges } from "@tabler/icons-react";
import { usePurchasedCourses } from "../../hooks/useCourse";
import { Course } from "../../types/course";

function BoughtDashboard() {
  const [username, setUsername] = useState("");

  const { data } = useUser();
  useEffect(() => {
    if (data) {
      setUsername(data);
    }
  }, [data]);

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
  const { data, isLoading } = usePurchasedCourses();

  if (isLoading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (data.purchasedCourses.length == 0) {
    return (
      <div className="flex justify-center">No purchased courses found</div>
    );
  }

  return (
    <>
      <Text size={"xl"} m={"xl"} weight={"bolder"}>
        Purchased Courses
      </Text>
      <SimpleGrid m={"xl"} cols={3}>
        {data.purchasedCourses.map((course: Course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default BoughtDashboard;
