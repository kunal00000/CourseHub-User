import { Button, Center, Group, Image, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  function onLogin() {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="w-[100vw] h-[100vh]">
      <nav>
        <Group position="apart" className="m-10 mx-24">
          <Text className="text-3xl font-bold">CourseHub</Text>
          <Group>
            <Button onClick={onLogin} variant="subtle" color="cyan">
              Login
            </Button>
            <Link to="/register">
              <Button variant="outline" color="cyan">
                Start for free
              </Button>
            </Link>
          </Group>
        </Group>
      </nav>
      <Center h={"65vh"}>
        <Group position="apart" className="w-[85vw]">
          <div>
            <Text fw={700} lineClamp={2} className="text-5xl text-bold">
              Learn something
              <br />
              new everyday.
            </Text>
            <Text className="my-7">
              Let's learn new course and Gain more skills
              <br />
              all using just CourseHub.
            </Text>
            <Group className="" spacing="sm">
              <Link to="/register">
                <Button variant="outline" color="teal">
                  Start for free
                </Button>
              </Link>
              <Button onClick={onLogin} variant="light">
                Explore Courses
              </Button>
            </Group>
          </div>
          <div>
            <Image
              width={540}
              height={490}
              fit="contain"
              src={
                "https://otus.com/wp-content/uploads/2022/06/Homepage-Header.png"
              }
              alt="CourseHub"
              caption="Over 100K+ students have leveled up their learnings and skills using CourseHub."
            />
          </div>
        </Group>
      </Center>
    </div>
  );
};

export default Landing;
