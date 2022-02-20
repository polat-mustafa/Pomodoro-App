import React, { useEffect, useState } from "react";
// import React bootstrap
import { Row, Badge, Modal, Button } from "react-bootstrap";
// npm packages
import axios from "axios";
//COMPONENT
import SingleLesson from "./SingleLesson";

const List = () => {
  const [itemsList, setItemsList] = useState([]); // itemsList'i state olarak oluşturuyoruz.

  /* 
  async function oluşturuyoruz. verileri çekmek için axios kullanıyoruz ve setItemsList'i güncelliyoruz.
  
  */

  const fetchUsers = async () => {
    // async function
    const response = await axios.get("http://localhost:3000/items");
    setItemsList(response.data); // itemsList e axiosdan gelen dataları set ediyoruz. useState hook u ile itemsList'i güncelliyoruz.
    console.log(response.data);
  };

  // enter a basıldıgında oluşacak işlemler
  const keyDownEvent = (e) => {
    if (e.key === "Enter") {
      axios
        .post("http://localhost:3000/items", {
          title: e.target.value,
          created_at: new Date().toLocaleString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "long",
            hour: "2-digit",
            hour12: false,
            minute: "2-digit",
            second: "2-digit",
          }),

          completed: false,
        })
        .then((res) => {
          fetchUsers(); // yeni eklenen item'ı listeye ekle. enter e basıldıgında yeni item ekleniyor.
          e.target.value = "";
          e.target.focus();
          console.log(res);
        });
      // input daki degeri post ediyoruz ve servera gonderiyoruz. Yazılan değer title olarak alınıyor. created_at değeri ise tarih olarak alınıyor. Oluşturulma tarihi olarak kullanılıyor. Tamamlanma durumu false olarak alınıyor.

      e.preventDefault(); // sayfanın yenilenmesini engeller
    }
  };

  // total length
  const totalLength = itemsList.length;

  const [show, setShow] = useState(false); // Modal açıklama işlemi için oluşturulan state değişkenleri

  useEffect(() => {
    // sayfa yüklendiğinde çalışacak işlemler
    fetchUsers();
  }, []);

  return (
    <div className="mt-3 ">
      <div
        style={{
          textAlign: "center",
        }}
      >
        {" "}
        <input
          type="text"
          placeholder="Ne çalışacaksın?"
          onKeyPress={keyDownEvent}
          style={{
            width: "40%",
            margin: "0 auto",
            borderRadius: "5px",
            height: "50px",
            fontSize: "20px",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <h3>
          Toplam <Badge bg="secondary">{totalLength}</Badge> ders eklendi.
        </h3>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "5px",
        }}
      >
        <Button variant="danger" onClick={() => setShow(true)}>
          Açıklamayı Okumak için Tıklayınız.
        </Button>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Açıklama
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Nasıl Kullanılır?</strong> <br />
              Çalışacagın dersi ve konusunu yazıp 'Enter' tuşuna bastıktan sonra
              dersin bitmesini bekle. Uyarı mesajı geldikten sonra diğer dersini
              yazıp devam edebilirsin. Önceki derslerin sen silmeden silinmez
              elbette sayfayı yenilememen lazım ve böylece en son yazdığın ödev
              kartını kolayca takip edebilirsin. İyi çalışmalar :) <br />
              <br />
              <strong>Pomodoro Tekniği nedir?</strong> <br />
              1980’li yılların sonunda Francesco Cirillo tarafından geliştirilen
              pomodoro tekniği, zaman yönetimi konusunda tüm dünyada bilinen ve
              sıklıkla uygulanan bir teknik. Hem ders çalışırken hem de
              profesyonel iş hayatında verimliliği artırmaya yönelik bir teknik
              olan pomodoro, temel olarak zamanı çalışma ve mola olacak şekilde
              parçalara bölüyor. 25 dakikalık çalışma ve 5 dakikalık molalardan
              oluşan her bir periyot, bir pomodoro olarak kabul ediliyor. Bu
              aralıkların takibinde ise mutlaka bir zamanlayıcı kullanılması
              öneriliyor.
            </p>
          </Modal.Body>
        </Modal>
      </div>

      <Row style={{ listStyleType: "none" }}>
        {itemsList.map((item, idx) => (
          <SingleLesson user={item} key={idx} />
        ))}
      </Row>
    </div>
  );
};

export default List;
