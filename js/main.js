$(document).on('ready', function() {
  $.ajax({
    url: 'https://api.github.com/repos/angular/angular/issues'
  }).done((data) => {
    data.forEach((issue) => {

      let assignees = [];
      if (issue.assignees.length) {
        issue.assignees.forEach((assignee) => {
          assignees.push(`<a href="${assignee.html_url}">${assignee.login}</a>`);
        });
        assignees.join(', ');
      } else {
        assignees = 'none';
      }


      $('.all-issues').append(
        `<div class="col-xl-6 individual-issue" id="${issue.id}">
          <div class="col-md-12">
          <p class="pull-right">
            Issue #${issue.number}
          </p>
          <h2 class="title">${issue.title} <br><a href="${issue.html_url}"><small> View on Github »</small></a></h2>
          <h3>
            Opened by <a href="${issue.user.html_url}">${issue.user.login}</a>
          </h3>
          <h5>
            on ${issue.created_at.split('T')[0]}
          </h5>
          <h4 class="` + issue.id + `-assignees">
            Assignee(s): ${assignees}
          </h4>
          <p class="${issue.state}">
            ${issue.state}
          </p>
          <div class="description">
            ${marked(issue.body)}
          </div>
        </div>
      </div>`);
    });

  }).fail(function() {
    $('.all-issues').prepend(`<h1>Something Went Wrong Loading GH Issues :(</h1>`);
  });

});


$('form').on('input', function() {

  const titles = document.getElementsByClassName('title');
  const content = document.getElementsByClassName('description');

  for (var i = 0; i < titles.length; i++) {

    let textSearch = $('#searchbar').val().toLowerCase();
    let issueContent = content[i].textContent.toLowerCase();
    let titleContent = titles[i].textContent.toLowerCase();
    var id = titles[i].closest('.individual-issue').id;

    if (titleContent.indexOf(textSearch) === -1 && issueContent.indexOf(textSearch) === -1) {
      $(`#${id}`).hide(350);
    } else {
      $(`#${id}`).show(350);
    }
  }

  if ($('.individual-issue:visible').length === 0) {
    $('.no-results').show();
  } else {
    $('.no-results').hide();
  }
});

$('form').on('submit', function(e) {
  e.preventDefault();
})
