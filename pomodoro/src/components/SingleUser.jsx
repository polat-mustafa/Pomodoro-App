import React from "react";
import { useState } from "react";

// import React bootstrap
import { Modal, Alert, Col } from "react-bootstrap";

// npm package
import axios from "axios";
import Countdown from "react-countdown";

const SingleUser = ({ user }) => {
  // user props'u ile gelen verileri SingleUser'a gönderiyoruz.

  const [setItemsList] = useState([]);

  const [checked, setChecked] = React.useState(false); // check işlemi için oluşturulan state değişkenleri

  const fetchUsers = async () => {
    // async function
    const response = await axios.get("http://localhost:3000/items");
    setItemsList(response.data); // itemsList e axiosdan gelen dataları set ediyoruz. useState hook u ile itemsList'i güncelliyoruz.
  };

  // Silme işlemi için oluşturulan state değişkenleri
  const deleteUser = (id) => {
    // async function
    axios.delete(`http://localhost:3000/items/${id}`);
    fetchUsers(); // item silindiğinde listeyi yeniden getir.
    // refresh page
    window.location.reload();
  };

  // Ders tamamlandığında oluşacak işlemler
  const alertMessage = () => {
    return (
      <div>
        {" "}
        <Alert variant="success">
          <Alert.Heading>
            Mükemmel ! {user.title} dersini tamamlandın. Şimdi biraz mola
            vermeye ne dersin?
          </Alert.Heading>
        </Alert>
      </div>
    );
  };

  //npm paketinden gelen özellikleri yazıyoruz. Bize sadece dakika ve saniye işlemi gerekiyor.
  const renderer = ({ minutes, seconds, completed }) => {
    // countdown componenti için renderer fonksiyonu oluşturuyoruz.
    if (completed) {
      // Render a completed state
      return alertMessage(user.id);
    } else {
      // Render a countdown
      return (
        <span>
          <h1>
            {minutes}:{seconds}
          </h1>
        </span>
      );
    }
  };

  // checked after completed true
  const handleChange = (e) => {
    // async function
    axios.put(`http://localhost:3000/items/${user.id}`, {
      // item in completed true olduğu zaman checked true olacak
      // checked true olduğu zaman completed true olacak
      // önceki değerlerimiz koybolmaması için tekrar tanımlıyoruz.
      title: user.title,
      created_at: user.created_at,
      completed: true,
      id: user.id,
    });
    fetchUsers(); // item tamamlandığında listeyi yeniden getir.

    setChecked(true);
  };

  return (
    <Col>
      <div className="bg-dark" style={{ border: "1px solid black" }}>
        {" "}
        <Modal.Dialog>
          <Modal.Header closeButton onClick={() => deleteUser(user.id)}>
            <Modal.Title>{user.id}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h3>{user.title}</h3>

            <div
              style={{
                textAlign: "center",
              }}
            >
              <Countdown
                date={Date.now() + 1500000}
                renderer={renderer}
                onComplete={() => alert(user.id + " dersi tamamlandı")}
              />
            </div>
            <label>
              <input
                type="checkbox"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
                onClick={() => handleChange(user.id)}
              />
              Tamamlandı!
            </label>
          </Modal.Body>

          <Modal.Footer>
            <small variant="secondary">
              {" "}
              <strong>Oluşturuldu: </strong> {user.created_at}{" "}
            </small>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </Col>
  );
};

export default SingleUser;
