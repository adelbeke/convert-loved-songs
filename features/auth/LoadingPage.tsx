import { Icon, ICONS } from "@/design-system/components/Icon";

export const LoadingPage = () => (
  <section className={"flex flex-col items-center justify-center h-screen"}>
    <Icon
      icon={ICONS.loading}
      className={"animate-spin h-10 w-10"}
      color={"#1ED760"}
    />
  </section>
);
