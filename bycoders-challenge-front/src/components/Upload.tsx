import { useState, ChangeEvent } from "react";
import { FinancialMovement } from "../models/financialMovement";
import { FinancialMovementFactory } from "../models/financialMovementFactory";
import { APIConnectService } from "../services/apiConnect.service";

import classes from "./Upload.module.css";

interface selectFileFeedback {
    successful: boolean,
    message: string
}

interface UploadProps {
    onSetTransactions: (t: FinancialMovement[]) => void;
    onSaveFile: () => void;
}

const Upload: React.FC<UploadProps> = (props) => {
    const [fileSelectionMessage, setFileSelectionMessage] = useState<selectFileFeedback>();
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState<boolean>(false);
    const [fileSavingMessage, setFileSavingMessage] = useState<selectFileFeedback>();
    const [dataToSave, setDataToSave] = useState<FinancialMovement[]>([]);

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setIsSaveButtonEnabled(false);

        if (ev.target.files && ev.target.files[0]) {
            setFileSelectionMessage(undefined);
            setDataToSave([]);
            props.onSetTransactions([]);
          
            const textType = /text.*/;
            const extension = (ev.target.value as string).split('.')[1];
            if (ev.target.files[0].type.match(textType) && extension === 'txt') {
                parseFile(ev);
            } else {
                setFileSelectionMessage({
                    successful: false,
                    message: 'Invalid file type'
                });
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
                try {
                    const financialMovs = lines.map(FinancialMovementFactory.build);
                    props.onSetTransactions(financialMovs);
                    setDataToSave(financialMovs);
                    setIsSaveButtonEnabled(true);
                    
                    setFileSelectionMessage({
                      successful: true,
                      message: 'File selected successfuly'
                    });
                    setFileSavingMessage(undefined);
                } catch (err: any) {
                    setFileSelectionMessage({
                        successful: false,
                        message: err.message
                    });
                }
            } else {
                setFileSelectionMessage({
                    successful: false,
                    message: 'Something went wrong. Please try again.'
                });
            }
        };
        reader.readAsText(ev.target.files![0]);
    }

    const saveData = () => {
      APIConnectService.saveTransactions(dataToSave)
        .then((res) => {

          setFileSavingMessage({
            successful: true,
            message: 'File saved successfuly'
          }); 
          
          props.onSaveFile();
          setIsSaveButtonEnabled(false);
        })
        .catch((err) => {
          setFileSavingMessage({
            successful: false,
            message: err+''
          });
        })
    };

    const clearFile = () => {

    }
  
    return (
        <form>
          <p>Please select your CNAB file. <span>(Check below file information before saving)</span></p>
          <div className={classes.buttonsContainer}>
            <div className={classes.uploadContainer}>
              <div>
                <label htmlFor="fileInput" className={classes.upFileLabel}>Select file</label>
                <input type="file" id="fileInput" name='fileInput' accept='.txt' onChange={onChange} />
              </div>
              <div className={classes.feedbackMsg}>
                {!!fileSelectionMessage && (
                  <p className={fileSelectionMessage.successful ? classes.success : classes.fail }>
                    {fileSelectionMessage.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button type="button" onClick={saveData} disabled={!isSaveButtonEnabled}>Save</button>
              <div className={classes.feedbackMsg}>
                {!!fileSavingMessage && (
                  <p className={fileSavingMessage.successful ? classes.success : classes.fail }>
                    {fileSavingMessage.message}
                  </p>
                )}
              </div>
            </div>
          </div>

        </form>
    );
  };
  
  export default Upload;