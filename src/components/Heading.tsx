import { FC } from "react";
import { Helmet } from "react-helmet";

type Props = {
  title: string;
  description: string;
  keywords: string;
};

const Heading: FC<Props> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='icon' type='image/svg+xml' href='/vite.svg' />
    </Helmet>
  );
};

export default Heading;
