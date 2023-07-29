import Image from "react-bootstrap/Image";
import "./banner.css";

function Banner() {
  return (
        <Image
                src="/image/banner.jpg"
                style={{ backgroundSize: "cover", width:"100%", height: "200px", objectFit: "cover", objectPosition: 'center'}}
              />
  );
}

export default Banner;
