package com.csi.rh_project.auth.helper;

import com.csi.rh_project.auth.models.User;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelHelper {
  public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  static String[] HEADERs = { "Id", "Firstname", "Lastname", "Email" , "Password"  };
  static String SHEET = "users";

  public static boolean hasExcelFormat(MultipartFile file) {

    if (!TYPE.equals(file.getContentType())) {
      return false;
    }

    return true;
  }

  public static ByteArrayInputStream tutorialsToExcel(List<User> tutorials) {

    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
      Sheet sheet = workbook.createSheet(SHEET);

      // Header
      Row headerRow = sheet.createRow(0);

      for (int col = 0; col < HEADERs.length; col++) {
        Cell cell = headerRow.createCell(col);
        cell.setCellValue(HEADERs[col]);
      }

      int rowIdx = 1;
      for (User tutorial : tutorials) {
        Row row = sheet.createRow(rowIdx++);

        row.createCell(0).setCellValue(tutorial.getId());
        row.createCell(1).setCellValue(tutorial.getFirstname());
        row.createCell(2).setCellValue(tutorial.getLastName());
        row.createCell(3).setCellValue(tutorial.getEmail());
        row.createCell(3).setCellValue(tutorial.getPassword());

      }

      workbook.write(out);
      return new ByteArrayInputStream(out.toByteArray());
    } catch (IOException e) {
      throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
    }
  }

  public static List<User> excelToTutorials(InputStream is) {


    try {
      System.out.println("5");
      System.out.println(is);

      Workbook workbook = new XSSFWorkbook(is);
      //System.out.println(workbook);

      //HSSFWorkbook workbook = new HSSFWorkbook(is);

      //Sheet sheet = workbook.getSheet(SHEET);
      Sheet sheet= workbook.getSheet(SHEET);
      System.out.println(sheet);

      if (sheet == null) {
        System.out.println("nullsheet");

        throw new IllegalArgumentException("No sheet exists with name " + SHEET);
      }

      Iterator<Row> rows = sheet.iterator();
      System.out.println("55555");
      System.out.println(rows);

      List<User> tutorials = new ArrayList<User>();

      int rowNumber = 0;
      while (rows.hasNext()) {
        Row currentRow = rows.next();

        // skip header
        if (rowNumber == 0) {
          rowNumber++;
          continue;
        }

        Iterator<Cell> cellsInRow = currentRow.iterator();

          User tutorial = new User();

        int cellIdx = 0;
        while (cellsInRow.hasNext()) {
          Cell currentCell = cellsInRow.next();

          System.out.println("22222");
          System.out.println(cellIdx);
          System.out.println("3333");

          switch (cellIdx) {
          case 0:
            tutorial.setId((int) currentCell.getNumericCellValue());
            break;

          case 1:
            tutorial.setFirstName(currentCell.getStringCellValue());
            break;

          case 2:
            tutorial.setLastName(currentCell.getStringCellValue());
            break;

          case 3:
            tutorial.setEmail(currentCell.getStringCellValue());
            break;
          case 4:
            tutorial.setPassword(currentCell.getStringCellValue());
            break;

          default:
            break;
          }

          cellIdx++;
        }
        System.out.println("tutorial");

        System.out.println(tutorial);

        tutorials.add(tutorial);
      }

      workbook.close();

      return tutorials;
    } catch (IOException e) {
      throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
    }
  }
}
