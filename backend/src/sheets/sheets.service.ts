import { BadRequestException, Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';

@Injectable()
export class SheetsService {
  async generateSheet(columns: string[], data: any[]) {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('agendamentos-report');
    const headerStyle = { font: { bold: true } };

    sheet.getRow(1).values = columns;
    sheet.getRow(1).eachCell((cell) => (cell.style = headerStyle));

    data.forEach((row, index) => {
      sheet.getRow(index + 2).values = row;
    });

    sheet.columns.forEach((col) => {
      col.width = 20;
    });

    return await new Promise((resolve) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: 'report',
          postfix: '.xlsx',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          if (err) throw new BadRequestException(err);

          await workbook.xlsx
            .writeFile(file)
            .then(() => {
              resolve(file);
            })
            .catch((err) => {
              throw new BadRequestException(err);
            });
        },
      );
    });
  }
}
