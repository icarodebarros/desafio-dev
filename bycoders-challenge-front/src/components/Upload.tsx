import { ChangeEvent, useState } from "react";
import { FinancialMovement } from "../models/financialMovement";

import classes from "./Upload.module.css";

interface selectFileFeedback {
    successful: boolean,
    message: string
}

const Upload: React.FC<any> = (props) => {
    const [fileSelectionMessage, setFileSelectionMessage] = useState<selectFileFeedback>();

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const textType = /text.*/;
        const extension = (ev.target.value as string).split('.')[1];
        if (ev.target.files && ev.target.files[0]) {
            setFileSelectionMessage(undefined);

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
                    const financialMovs = lines.map(buildFinancialMovObj);
                    console.log(financialMovs);
                    setFileSelectionMessage({
                        successful: true,
                        message: 'File selected successfuly'
                    });
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

        
    const buildFinancialMovObj = (raw: string) => {
        if (raw.length < 80) {
            throw new Error('The content format is wrong');
        }

        const type = raw.substring(0, 1);
        const date = raw.substring(1, 9);
        const value = raw.substring(9, 19);
        const cpf = raw.substring(19, 30);
        const card = raw.substring(30, 42);
        const time = raw.substring(42, 48);
        const ownerName = raw.substring(48, 62);
        const storeName = raw.substring(62, 81);

        const datetime = buildFullDate(date, time);

        const obj = new FinancialMovement(
            +type, datetime, +value/100, +cpf, card, ownerName.trim(), storeName.trim()
        );
        return obj;
    }

    const buildFullDate = (date: string, time: string) => {
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6);
        const hour = time.substring(0, 2);
        const min = time.substring(2, 4);
        const sec = time.substring(4);
        
        const datetime = new Date(+year, +month, +day, +hour, +min, +sec);
        
        if (datetime.toString() === 'Invalid Date') {
            throw new Error('The content format is wrong');
        }
        return datetime;
    }
    

    return (
        <form>
            <p>Please upload your CNAB file:</p>
            <div className={classes.uploadContainer}>
                <div>
                    <label htmlFor="fileInput" className={classes.upFileLabel}>Upload</label><br />
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

        </form>
    );

}

export default Upload;