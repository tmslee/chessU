import "./styles/HomeMenu.scss"
import {Button, Modal} from "react-bootstrap";

export default function Error(props) {
  const {returnToGameOptions} = props;

  return (
    <>
      <Modal.Body>
        <section className="appointment__error-message">
          <h1 className="text--semi-bold">Failed to send invite!</h1>
          <h3 className="text--light">it appears that your opponent is busy right now</h3>
        </section>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={returnToGameOptions}>
          Exit
        </Button>
      </Modal.Footer>
    </>
  );
};
     