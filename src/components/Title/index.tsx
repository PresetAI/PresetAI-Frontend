type Props = {
  title: string;
  subtitle?: string;
};

function Title(props: Props) {
  const { title, subtitle } = props;
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
      <h3 className="mt-2 text-md text-gray-700">{subtitle}</h3>
    </>
  );
}

export default Title;
