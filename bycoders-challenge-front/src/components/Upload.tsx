import { ChangeEvent, useState } from "react";
import { FinancialMovement } from "../models/financialMovement";
import { FinancialMovementFactory } from "../models/financialMovementFactory";

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
                    const financialMovs = lines.map(FinancialMovementFactory.build);
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