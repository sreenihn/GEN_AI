import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

export class TableExportUtil {
    
    static exportExcel(data: any, fileName: string,formatHeaderNames?: boolean) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(fileName);
      if (data?.length > 0) {
        const headers = formatHeaderNames ? this.getExcelHeaders(Object.keys(data[0])) : Object.keys(data[0]);
    
        // Add the header row with styling
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell((cell, colNumber) => {
          cell.font = { bold: true };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ffecf0f4" }, 
          };
          cell.border = {
            left: {style: 'thin',color: {argb:'ffc0c0c2'}},
            right: {style: 'thin',color: {argb:'ffc0c0c2'}}
          }
          cell.alignment = { horizontal: "left", vertical: "middle" };// Align header cells
          // Adjust the column width based on header text length
          const headerTextLength = cell.value?.toString().length || 10; 
          worksheet.getColumn(colNumber).width = headerTextLength + 2;
        });
    
        // Add data rows
        data.forEach((rowData: any) => {
          const row = worksheet.addRow(Object.values(rowData));
          row.alignment = { vertical: "middle", horizontal: "left" }; // Align data cells
        });
      }
      // Generate Excel file and save it
      workbook.xlsx.writeBuffer().then((buffer) => {
        this.saveAsExcelFile(buffer, fileName);
      });
    }

    private static saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(() => {
          let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
          FileSaver.saveAs(data, fileName + '.xlsx');
        });
      }

    /**
     * @description This method is used to change the header names for Excel file.
     * @param headers changable header names array
     * @returns formated header names array
     */
    private static getExcelHeaders(headers: string[]): string[] {
    return headers.map(header => {
        // Add space before capital letters (camel case) and capitalize first letters
        return header.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/(?:^|\s)\S/g, c => c.toUpperCase());
    });
    }
}