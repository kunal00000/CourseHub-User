import { SimpleGrid, Text, Stack, Flex } from "@mantine/core";
import CourseCardCompact from "./CourseCardCompact";
import { useEffect, useState } from "react";
import { Course } from "../../types/course";
import { useCourses, usePurchasedCourses } from "../../hooks/useCourse";

const Overview = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  // const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);

  const { data, isLoading } = useCourses();
  const { data: purchasedData, isLoading: purchasedIsLoading } =
    usePurchasedCourses();

  useEffect(() => {
    if (!isLoading && data.courses.length > 0) {
      setCourses(data.courses);
    }
  }, [isLoading, data]);

  if (isLoading || purchasedIsLoading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  return (
    <div>
      <Text size={"xl"} px={"xl"} weight={"bolder"}>
        Overview
      </Text>
      <Flex m={"xl"} columnGap={"5vw"} className="relative">
        <Stack w={"35vw"} m={"xl"}>
          <Text size={"xl"} weight={"bold"}>
            All Courses
          </Text>
          <SimpleGrid cols={1}>
            {courses.length > 0
              ? courses.map((course) => {
                  return <CourseCardCompact key={course._id} course={course} />;
                })
              : ""}
          </SimpleGrid>
        </Stack>
        <Stack w={"35vw"} m={"xl"}>
          <Text size={"xl"} weight={"bold"}>
            Purchased Courses
          </Text>
          <SimpleGrid cols={1}>
            {purchasedData.purchasedCourses.length > 0
              ? purchasedData.purchasedCourses.map((course: Course) => {
                  return <CourseCardCompact key={course._id} course={course} />;
                })
              : ""}
          </SimpleGrid>
        </Stack>
      </Flex>
    </div>
  );
};

export default Overview;
