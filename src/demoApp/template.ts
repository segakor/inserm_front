export const template = {
  "content": [
    {
      "table": {
        "widths": [
          440,
          100
        ],
        "body": [
          [
            {
              "image": "data:image/jpeg;base64,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",
              "width": 130,
              "border": [
                false
              ]
            },
            {
              "text": "\ninfo@inserm.ru",
              "border": [
                false
              ]
            }
          ]
        ]
      }
    },
    {
      "text": "\n"
    },
    {
      "text": "\n"
    },
    {
      "style": "tableExample",
      "table": {
        "widths": [
          300,
          40,
          170
        ],
        "body": [
          [
            {
              "rowSpan": 2,
              "text": "Банк получателя\n\nАО \"ТИНЬКОФФ БАНК\""
            },
            "БИК",
            {
              "text": "044525974"
            }
          ],
          [
            "",
            "Сч. №",
            "30101810145250000974"
          ],
          [
            "ИНН 332760903109",
            "Сч. №",
            "40802810300000051817"
          ],
          [
            {
              "colSpan": 3,
              "text": "Получатель\n\nИП БОРОДИН НИКИТА СЕРГЕЕВИЧ"
            },
            "",
            ""
          ]
        ]
      }
    },
    {
      "text": "\n\n"
    },
    {
      "text": "Счет на оплату №2089798 от 26.02.2024",
      "style": "header"
    },
    {
      "text": "\n"
    },
    {
      "text": "_______________________________________________________________________________________________"
    },
    {
      "text": "\n"
    },
    {
      "columns": [
        {
          "width": 90,
          "text": "Исполнитель:"
        },
        {
          "width": "auto",
          "text": "ИП БОРОДИН НИКИТА СЕРГЕЕВИЧ, ИНН 332760903109, 600021, РОССИЯ, ВЛАДИМИРСКАЯ ОБЛ., Г. ВЛАДИМИР, УЛ. МЮДА, Д. 3А"
        }
      ]
    },
    {
      "text": "\n"
    },
    {
      "columns": [
        {
          "width": 90,
          "text": "Покупатель:"
        },
        {
          "width": "auto",
          "text": "Бар 'Поросячий визг', ИНН:1, ОГРН:2, Бар 'Поросячий визг', 88005553535, demo@test.ru"
        }
      ]
    },
    {
      "text": "\n\n"
    },
    {
      "table": {
        "widths": [
          20,
          315,
          40,
          25,
          40,
          40
        ],
        "body": [
          [
            "№",
            "Наименование работ, услуг",
            "Кол-во",
            "Ед.",
            "Цена",
            "Сумма"
          ],
          [
            "1",
            "Отзывы / inserm",
            10,
            "Шт.",
            250,
            2500
          ]
        ]
      }
    },
    {
      "text": "\n\n"
    },
    {
      "text": "Всего наименований на сумму 2500 руб."
    },
    {
      "text": "\n\n"
    },
    {
      "text": "___________________________________________"
    },
    {
      "text": "\n\n"
    },
    {
      "table": {
        "widths": [
          "auto",
        ],
        "body": [
          [
            {
              "text": "\nИсполнитель: __________________ Бородин Никита Сергеевич",
              "border": [
                false
              ]
            },
          ]
        ]
      }
    },
    {
      "text": "\n\n"
    },
  ],
  "styles": {
    "header": {
      "fontSize": 18,
      "bold": true
    }
  }
}

export const act = {
  "content": [
    {
      "table": {
        "widths": [
          440,
          100
        ],
        "body": [
          [
            {
              "image": "data:image/jpeg;base64,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",
              "width": 130,
              "border": [
                false
              ]
            },
            {
              "text": "\ninfo@inserm.ru",
              "border": [
                false
              ]
            }
          ]
        ]
      }
    },
    {
      "text": "\n\n\n"
    },
    {
      "text": "Акт о приемке выполненных работ по Счету на оплату № 2089798 от 26.02.2024",
      "style": "header",
      "alignment": "center"
    },
    {
      "text": "\n"
    },
    {
      "text": "26.02.2024 г.",
      "alignment": "center"
    },
    {
      "text": "\n\n"
    },
    {
      "columns": [
        {
          "width": 90,
          "text": "Исполнитель:",
          "bold": true
        },
        {
          "width": "auto",
          "text": "ИП БОРОДИН НИКИТА СЕРГЕЕВИЧ, ИНН 332760903109, 600021, РОССИЯ, ВЛАДИМИРСКАЯ ОБЛ., Г. ВЛАДИМИР, УЛ. МЮДА, Д. 3А"
        }
      ]
    },
    {
      "text": "\n"
    },
    {
      "columns": [
        {
          "width": 90,
          "text": "Заказчик:",
          "bold": true
        },
        {
          "width": "auto",
          "text": "Бар 'Поросячий визг', 1, 2, Бар 'Поросячий визг', 88005553535, demo@test.ru"
        }
      ]
    },
    {
      "text": "\n\n"
    },
    {
      "table": {
        "widths": [
          290,
          40,
          25,
          45,
          60
        ],
        "body": [
          [
            "Наименование работы (услуги)",
            "Кол-во",
            "Ед.",
            "Цена",
            "Сумма"
          ],
          [
            "Отзывы / inserm",
            "10",
            "Шт.",
            "250",
            "2500"
          ],
          [
            {
              "rowSpan": 3,
              "border": [
                false,
                false,
                false,
                false
              ],
              "text": ""
            },
            {
              "border": [
                false,
                false,
                false,
                false
              ],
              "colSpan": 3,
              "text": "Итого:",
              "bold": true,
              "alignment": "right"
            },
            "",
            "",
            "2500"
          ],
          [
            "",
            {
              "border": [
                false,
                false,
                false,
                false
              ],
              "colSpan": 3,
              "text": "Без налога (НДС)",
              "bold": true,
              "alignment": "right"
            },
            "",
            "",
            "Без НДС"
          ],
          [
            "",
            {
              "border": [
                false,
                false,
                false,
                false
              ],
              "colSpan": 3,
              "text": "Итого (с учетом НДС)",
              "bold": true,
              "alignment": "right"
            },
            "",
            "",
            "2500"
          ]
        ]
      }
    },
    {
      "text": "\n"
    },
    {
      "text": "Всего оказано услуг на сумму: 2500 рублей. \nБез НДС."
    },
    {
      "text": "\n\n"
    },
    {
      "italics": true,
      "text": "Вышеперечисленные услуги выполнены полностью. Заказчик по объему и качеству оказания услуг претензий не имеет.",
      "style": [
        "quote"
      ]
    },
    {
      "text": "\n\n"
    },
    {
      "text": "___________________________________________"
    },
    {
      "text": "\n\n"
    },
  ],
  "styles": {
    "header": {
      "fontSize": 14,
      "bold": true
    }
  }
}