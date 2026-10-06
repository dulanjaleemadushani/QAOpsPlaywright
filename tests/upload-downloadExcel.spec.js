
const{test,expect,request}= require("@playwright/test");

async function writeExcelTest(searchText,replacetext,change,filePath) {

   

    const ExcelJs = require('exceljs');
    const workbook = new ExcelJs.Workbook(); // first workbook
    await workbook.xlsx.readFile(filePath)
     const worksheet = workbook.getWorksheet('Sheet1'); // second getsheet
    const output = await readExcel(worksheet,searchText);

    {
        
        const cell = worksheet.getCell(output.row,output.column+change.colChange);
        cell.value = replacetext
        await workbook.xlsx.writeFile(filePath);

    };
}

async function readExcel(worksheet,searchText)
{
     let output ={row: -1, column:-1}
   
        worksheet.eachRow((row, rowNumber) => // third read all rows
        {
            row.eachCell((cell, colNumber) => // in a row get a cell
            {
                if (cell.value == searchText ) {
                    output.row= rowNumber;
                    output.column= colNumber;

                }

            })

        })
        return output;

}


//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:/Users/Admin/Downloads/exceldownloadTest.xlsx");

test("Upload Download excel Validation", async ({page})=>
    
    {
        const textsearch = "Mango";
        const updateValue = "350";
        const filePath = "C:/Users/Admin/Downloads/download.xlsx"
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('button',{name:'Download'}).click(); //download file
        const download = await downloadPromise;
        await download.saveAs(filePath);
        await writeExcelTest(textsearch,updateValue,{rowChange:0,colChange:2},filePath);
        await page.locator("#fileinput").click();
        await page.locator("#fileinput").setInputFiles(filePath); // upload file 

        // verification part
        const desiredRow =await page.getByRole('row').filter({has:page.getByText(textsearch)});
        await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);





})

