import './FlipCard.css';
import Card2 from './card/Card';
import {CSSTransition} from 'react-transition-group';
import {useState} from 'react';

function FlipCard(props) {
    const oeuvre = props.oeuvre;
    const type = props.type;
    const [showFront, setShowFront] = useState(true);

    return(
        <div className="flippable-card-container">
            <CSSTransition
                in={showFront}
                timeout={300}
                classNames='flip'
            >
                <Card2 onClick={() => {
                    setShowFront((v) => !v);
                }} 
                key={oeuvre.id} oeuvre={oeuvre} type={type}
                />
            </CSSTransition>
        </div>
    );
}

export default FlipCard;