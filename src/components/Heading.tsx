import { FC } from "react";
import { Helmet } from "react-helmet";

type Props = {
  title: string;
  description: string;
  keywords: string;
  icon?: string;
};

const Heading: FC<Props> = ({ title, description, keywords, icon }) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='icon' type='image/svg+xml' href={icon} />
    </Helmet>
  );
};

export default Heading;
