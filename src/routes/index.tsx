import { createFileRoute } from "@tanstack/react-router";
import { PassportApp } from "@/components/passport-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <PassportApp />;
}
