/*                                                      
                                              Listelerde ki elemanlari göstermenin yollari 


  1.Yol :  Uygulama icinde return edilecek olan liste elemanlarinin her birini tek tek yazarak göstermek.

        const App = (props) => {
          const { notes } = props

          return (
            <div>
              <h1>Notes</h1>
              <ul>
                <li>{notes[0].content}</li>
                <li>{notes[1].content}</li>
                <li>{notes[2].content}</li>
              </ul>
            </div>
          )
        }

        export default App


  2.Yol :  Uygulama icinde return edilecek olan liste elemanlarina map uzerinden ulasarak göstermek.

      const App = (props) => {
        const { notes } = props

        return (
          <div>
            <h1>Notes</h1>
            <ul>
              {notes.map(note => <li key={note.id}>{note.content}</li>)}  ===>  notes (main.jsx) icindeki elemanlar map ile ulasiyoruz.
                                                                                Ve her bir elemanin content icerigini gösteriyoruz li
                                                                                tag'ine yazilan key={note.id} map ile oluşturulan öğelerin
                                                                                benzersiz bir anahtar adına ihtiyaci vardir. Bu yuzden
                                                                                uygulama calissa bile console'da uyari yazdirir. Bu
                                                                                uyaridan kurtulmak icin key={note.id} yazildi. Bu satiri
                                                                                not'lara gir map'i kullanarak her bir not'a ulas,
                                                                                ulastigin not'un id degerini key olarak kullan ve
                                                                                content'ini ekranda göster seklinde okuyabiliriz.

            </ul>
          </div>
        )
      }

      export default App

  3.Yol :  2 yol'un destructuring ile sadelestirerek göstermek.

      const App = ({ notes }) => {       2. yolda ki ilk iki satiri destructuring (seklini bozma) yaparak tek satira indirdik
        return (
          <div>
            <h1>Notes</h1>
            <ul>
              {notes.map(note => 
                <li key={note.id}>
                  {note.content}
                </li>
              )}
            </ul>
          </div>
        )
      }

**************************************************************************************************************************************** 

  Note iceriklerini Note adinda bir bilesen olsuturarak bilesen uzerinden icerikleri cagiracagiz.

      const Note = ({ note }) => { // Note adinda bir bilesen olusturduk
        return (
          <li>{note.content}</li> // note'un icerigini retur etmesini söyledik.
        )
      }

      const App = ({ notes }) => {
        return (
          <div>
            <h1>Notes</h1>
            <ul>

              {notes.map(note => 
                <Note key={note.id} note={note} />
              )} ==> note'lare ulasip map yöntemini kullanarak her bir note icin Note bilesenini cagirdik 
            </ul>
          </div>
        )
      }

*/

/*
    Note bilesenimizi src altinda olusturdugumuz components dosyasi icindeki Note.jsx adinda baska bir dosyaya aktardik ve dosyamizi import ederek bilesenimizi kullandik
*/
import Note from "./components/Note"; // './Note.jsx' Bu sekilde de calisiyor.

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};
export default App;
