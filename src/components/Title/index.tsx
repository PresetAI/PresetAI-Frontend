type Props = {
  title: string;
  paragraph?: string;
};

function Title(props: Props) {
  const { title, paragraph } = props;
  return (
    <div>
      <div className="sm:flex-auto">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">{title}</h1>
      </div>
      {/*<p>fewafewafewafewafweaf</p>*/}
    </div>
  );
}

export default Title;
