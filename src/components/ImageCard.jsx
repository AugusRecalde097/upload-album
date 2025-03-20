import PropTypes from "prop-types";

const ImageCard = ({ imageUrl, title, description }) => {

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};
ImageCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ImageCard.defaultProps = {
  description: "Sin descripción disponible.",
};
export default ImageCard;
