import { Helmet } from "react-helmet-async";

interface HeaderProps {
  title: string;
  description: string;
}

export default function Head({ title, description }: HeaderProps) {
  return (
    <Helmet
      title={`Job Portal | ${title}`}
      defaultTitle="Job Portal Application"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
}
