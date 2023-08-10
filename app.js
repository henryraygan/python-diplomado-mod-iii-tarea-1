const URL = "https://api.nobelprize.org/v1/prize.json";
const elements = {};
const dropDownYears = $("#year");
const dropDownCategories = $("#category");
const tableBody = $("#bodytable");
dropDownCategories.prop("disabled", true);

$(document).ready(function () {
  loadData();
});

function loadData() {
  $.ajax({
    url: URL,
    method: "GET",
    dataType: "json",
    success: function (data) {
      processData(data.prizes);
      configDropdowns();
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

function processData(prizes) {
  $.each(prizes, function (index, prize) {
    const year = prize.year; // 2022
    const category = prize.category;

    if (!elements[year]) {
      elements[year] = {};
    }

    if (!elements[year][category]) {
      elements[year][category] = {};
    }

    elements[year][category] = {
      items: prize.laureates,
      overallMotivation: prize.overallMotivation,
    };
  });
}

function configDropdowns() {
  const years = Object.keys(elements);
  $.each(years, function (index, year) {
    dropDownYears.append(`<option value="${year}">${year}</option>`);
  });

  dropDownYears.change(function () {
    const selectedYear = $(this).val();
    const categories = Object.keys(elements[selectedYear]);

    dropDownCategories
      .empty()
      .append(
        '<option value="-1" disabled selected>Select a category</option>'
      );

    tableBody
      .empty()
      .append('<tr><td colspan="3">Select a category please</td></tr>');

    $.each(categories, function (index, category) {
      dropDownCategories.append(
        `<option value="${category}">${category}</option>`
      );
    });

    dropDownCategories.prop("disabled", false);
  });

  dropDownCategories.change(function () {
    const selectedYear = dropDownYears.val();
    const selectedCategory = $(this).val();
    const currentElement = elements[selectedYear][selectedCategory];
    createTableData(currentElement);
  });
}

function createTableData(obj) {
  const { items, overallMotivation } = obj;
  tableBody.empty();

  if (items) {
    $.each(items, function (index, item) {
      const { firstname, surname, motivation } = item;
      tableBody.append(
        `<tr>
          <th scope="row">${firstname}</th>
          <td>${surname}</td>
          <td>${motivation}</td>
        </tr>`
      );
    });
  } else {
    tableBody.append(
      `<tr>
            <td colspan="3">${overallMotivation}</td>
        </tr>`
    );
  }
}
