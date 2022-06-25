import { ChangeEvent } from 'react';
import './App.css';

function App() {

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const textType = /text.*/;
    const extension = (ev.target.value as string).split('.')[1];
    if (ev.target.files && ev.target.files[0]) {

      if (ev.target.files[0].type.match(textType) && extension === 'txt') {
        parseFile(ev);
      }
    }
  }

  const parseFile = async (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const reader = new FileReader();
    reader.onload = async (e) => { 
      const text = (e.target?.result);

      if (text) {
        // By lines 
        const lines = (text as string).split('\n');
        console.log(lines);
      }
    };
    reader.readAsText(ev.target.files![0]);
  }

  return (
    <div className="App">
      <p>ByCodersTec / desafio-dev</p>

      <div className='form-container card'>
        <form>
          <p>Please upload your CNAB file:</p>
          <div className='upload-container'>
              <input type="file" id="fileInput" name='fileInput' accept='.txt' onChange={onChange} />
          </div>

        </form>
      </div>

    </div>
  );
}

export default App;
