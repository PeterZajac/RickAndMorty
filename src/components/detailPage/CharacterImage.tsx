interface CharacterImageProps {
  data: {
    image: string;
    name: string;
  };
}
const CharacterImage = ({ data }: CharacterImageProps) => {
  return (
    <div className='m-right30'>
      <img src={data?.image} alt={data?.name} />
    </div>
  );
};

export default CharacterImage;
