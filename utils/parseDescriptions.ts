import * as htmlparser2 from "htmlparser2";
import { Condition } from "../types";


const isUpperCase = (string: string) => /([A-Z]+(:{1}))+/g.test(string)

export default (data: string): Condition[] => {
    /* Parser */
  const sections: Condition[] = []
  let index = 0;
  const parser = new htmlparser2.Parser({
   
    ontext(text) {
        if (isUpperCase(text)) {
            sections[index] = {
                condition: text,
                text: ""
            };
            return;
        }

        if (text.includes("Once per")) {
            console.log(text);
        }

        sections[index].text += text

    },
    onclosetag(tagname) {
      
        if (tagname === "br") {
            index++
        }
    },
  });

  parser.write(data);

  return sections.filter((value) => value);
}