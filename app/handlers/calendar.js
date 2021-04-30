  var setupCalendarInput = function() {
    document.querySelectorAll('.date-picker')
            .forEach(function(ele) {
            TinyDatePicker(ele, {
              mode: 'dp-below',
              dayOffset: 1,
              lang: {
                days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                months: [
                  'Th.Một',
                  'Th.Hai',
                  'Th.Ba',
                  'Th.Tư',
                  'Th.Năm',
                  'Th.Sáu',
                  'Th.Bảy',
                  'Th.Tám',
                  'Th.Chín',
                  'Th.Mười',
                  'Th.Mười Một',
                  'Th.Mười Hai',
                ],
                today: 'Hôm nay',
                clear: 'Xóa',
                close: 'Đóng',
            },
            format(date) {
              var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
              return date.toLocaleDateString('vi-vi', options);
            },
            parse(str) {
              var parts, date;
              if (str) {
                parts = str.split(',')[1].trim().split('/');
                date = new Date(parts[2], parts[1] - 1, parts[0]);
              }
              return isNaN(date) ? new Date() : date;
            },
        });
    });
  }
