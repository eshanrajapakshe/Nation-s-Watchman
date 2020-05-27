
let groupData = localStorage.getItem('newGroupList') ? JSON.parse(localStorage.getItem('newGroupList')) :
    [
        {
            id: '123',
            groupName: 'Colombo',
            groupMembers: '5',
            memberId: '',
            memberName: '',
            categoryName: ''
        }
    ];

const membersData = [
    {
        memberId: "122",
        memberName: "John Doe",
        categoryName: ''
    },
    {
        memberId: "333",
        memberName: "John Doe 1",
        categoryName: ''
    },
    {
        memberId: "545",
        memberName: "John Doe 2",
        categoryName: ''
    },
    {
        memberId: "786",
        memberName: "Brad Anget",
        categoryName: ''
    }
];

let selectedMembers = [];

let contactList = []

// var init = {
//     method: 'GET',
//     headers: { "content-type": "application/json" },
//     cache: 'default'
// };

// Get Group Data
// let getGroupData = new Request('../group.v1.json', init);

// fetch(getGroupData)
//     .then(function (resp) {
//         return resp.json();
//     })
//     .then(function (groupData) {
//         console.log(groupData);
//     });

// Get Members Data
// let getMembersData = new Request('../member.v1.json', init);

// fetch(getMembersData)
//     .then(function (resp) {
//         return resp.json();
//     })
//     .then(function (membersData) {
//         console.log(membersData);
//     });


checkUserLoginData();
loadList();
showAvailebleMembers();
loadaAvailableList();

function homeScreenTiles() {
    var widthInner = $('.group-item-alarm').width();
    $('.group-item-alarm').height(widthInner);
};

$(window).on('resize', function () {
    var widthInner = $('.group-item-alarm').width();
    $('.group-item-alarm').height(widthInner);
});

function checkUserLoginData() {
    if (localStorage.getItem('loginData') != null) {
        $(".login-main").hide();
        $("#main-sections-switcher").slideDown("slow");
    }
};

function showNavigationBarIcons() {
    $('.nav-status-bar').show();
    $('.navbar-toggler').show();
    $('#main-sections-switcher').show();
    $('#acknowledge-them').show();
};

// Save Login Data
function setLogInDetails() {
    let userNameInput = document.getElementById('login-phone').value;
    let passwordInput = document.getElementById('login-password').value;

    if (userNameInput != "" && passwordInput != "") {
        let userInputData = {
            userName: userNameInput,
            password: passwordInput
        }

        localStorage.setItem('loginData', JSON.stringify(userInputData));
        event.preventDefault();
        $(".login-main").slideUp("slow");
        $("#home-wrapper").slideDown("slow");
        showNavigationBarIcons();
        homeScreenTiles();
    } else {
        event.preventDefault();
        alert("Username or Password is wrong");
    }

}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('log-in-button').addEventListener('click', setLogInDetails);
});

function loadList() {
    document.getElementById("group-list-wrapper").innerHTML = `
        ${groupData.map(function addNewGoup(groupItemData) {
        return `
            <div class="group-item">
                <div class="group-item-details">
                    <h6 class="group-item-name">${groupItemData.groupName}</h6>
                    <p class="availeble-members">${groupItemData.groupMembers} Members</p>
                </div>
        
                <div class="group-item-alarm">
                    <button type="button" class="btn btn-danger emergency-button"><i class="fas fa-bell"></i>SOS</button>
                </div>
            </div>
            `
    }).join('')} 
 `
}

function loadaAvailableList() {
    document.getElementById("available-groups-wrapper").innerHTML = `
        ${groupData.map(function addNewGoup(groupItemData, index) {
        return `
            <div class="available-group-item" data-groupid="${index}">
                <div class="available-group-item-details">
                    <h6 class="available-group-item-name">${groupItemData.groupName}</h6>
                    <p class="availeble-members-group">${groupItemData.groupMembers} Members</p>
                </div>

                <div class="add-members-wrapper">
                    <button type="button" class="btn btn-danger remove-group-button"><i class="fas fa-trash-alt"></i></button>
                    <button type="button" class="btn btn-success add-members-main-button"><i class="fas fa-plus"></i></button>
                </div>
            </div>
            `
    }).join('')} 
 `
}

// Change home screen tile size
function homeTileSize() {
    $('.group-item').width('100%');
    if (groupData.length <= 1) {
        var widthInner = $('.group-item-alarm').width();
        $('.group-item-alarm').height(widthInner);
        $('.emergency-button').css('font-size', '3rem');
        $('.emergency-button .fa-bell').css('font-size', '130px');
    } else {
        $('.group-item').width('');
        var widthInner = $('.group-item-alarm').width();
        $('.group-item-alarm').height(widthInner);
        $('.group-item').height("");
        $('.emergency-button').css('font-size', '');
        $('.emergency-button .fa-bell').css('font-size', '');
    }
};


// Create a new group
const addGroup = (ev) => {
    ev.preventDefault();

    let addGroupInput = document.getElementById('create-group-input').value;
    let groupIndx = groupData.length;

    if (addGroupInput != "") {

        let newGroup = {
            id: Date.now(),
            groupName: document.getElementById('create-group-input').value,
            groupMembers: "Add",
        }

        var availableGroupItem = $('<div class="available-group-item"></div>').attr("data-groupid", groupIndx);
        var availableGroupItemDetails = $('<div class="available-group-item-details"></div>');
        var availableGroupItemName = $('<h6 class="available-group-item-name"></h6>').text(newGroup.groupName);
        var availebleMembersGroup = $('<p class="availeble-members-group"></p>').text(newGroup.groupMembers + " Members");
        var addMembersWrapper = $('<div class="add-members-wrapper"></div>');
        var removeGroupButton = $('<button type="button" class="btn btn-danger remove-group-button"><i class="fas fa-trash-alt"></i></button>');
        var addMembersMainButton = $('<button type="button" class="btn btn-success add-members-main-button"><i class="fas fa-plus"></i></button>').attr('data-groupid', newGroup.id);;

        availableGroupItemDetails.append(availableGroupItemName, availebleMembersGroup);
        addMembersWrapper.append(removeGroupButton, addMembersMainButton);
        availableGroupItem.append(availableGroupItemDetails, addMembersWrapper);
        $('#available-groups-wrapper').append(availableGroupItem);

        var groupItem = $('<div class="group-item"></div>');
        var groupItemDetails = $('<div class="group-item-details"></div>');
        var groupItemName = $('<h6 class="group-item-name"></h6>').text(newGroup.groupName);
        var availebleMembers = $('<p class="availeble-members"></p>').text(newGroup.groupMembers + " Members");
        var groupItemAlarm = $('<div class="group-item-alarm"></div>');
        var emergencyButton = $('<button type="button" class="btn btn-danger emergency-button"><i class="fas fa-bell"></i>SOS</button>');

        groupItemDetails.append(groupItemName, availebleMembers);
        groupItemAlarm.append(emergencyButton);
        groupItem.append(groupItemDetails, groupItemAlarm);

        $('#group-list-wrapper').append(groupItem);
        $(".your-groups-text").text("Your Groups");
        homeScreenTiles();

        groupData.push(newGroup);
        homeTileSize();

        //saving to localStorage
        localStorage.setItem('newGroupList', JSON.stringify(groupData));
        document.getElementById('create-group-input').value = "";

    } else {
        alert('Please enter the group name');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('create-group-ok').addEventListener('click', addGroup);
});


// Show new members
function showAvailebleMembers() {
    document.getElementById('availeble-members-list').innerHTML = `
    ${membersData.map(function (memberInfo, index) {
        return `
        <div class="member-list-item">
            <div class="member-details">
                <h6 class="member-details-name">${memberInfo.memberName}</h6>
            </div>
            <div class="member-add">
                <input class="member-select-checkbox" value=${index} type="checkbox">
            </div>
            <div class="member-categories-group-show">
                <p>Select category</p>
                <div class="form-check">
                    <input class="form-check-input category-select" type="radio" name="memberCategorySelect${memberInfo.memberId}" data-memberid=${memberInfo.memberId} id="familySelect${memberInfo.memberId}" value="Family">
                    <label class="form-check-label" for="familySelect${memberInfo.memberId}"> Family </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input category-select" type="radio" name="memberCategorySelect${memberInfo.memberId}" data-memberid=${memberInfo.memberId} id="neighborsSelect${memberInfo.memberId}" value="Neighbors">
                    <label class="form-check-label" for="neighborsSelect${memberInfo.memberId}"> Neighbors </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input category-select" type="radio" name="memberCategorySelect${memberInfo.memberId}" data-memberid=${memberInfo.memberId} id="friendsSelect${memberInfo.memberId}" value="Friends">
                    <label class="form-check-label" for="friendsSelect${memberInfo.memberId}"> Friends </label>
                </div>
            </div>
        </div>
        `
    }).join('')}`
}

function closeAddMembersWrapper() {
    $(".add-member-wrapper").slideUp();
};


// Select member checkbox
$(function () {
    $('.member-select-checkbox').change(function () {
        var parent = $(this).parent().parent().children(".member-categories-group-show");
        $(parent).toggle(this.checked);
        if (this.checked) {
            selectedMembers.push(membersData[this.value])
        } else {
            selectedMembers = selectedMembers.filter(sm => sm.memberId !== membersData[this.value].memberId)
        }
    }).change();
});

// Add members button
const addMembersBtn = document.querySelector('#add-members-btn');
addMembersBtn.onclick = function () {

    var isCheckedCheckbox = $('.member-select-checkbox:checked').length;
    var isCheckedRadio = $('.category-select:checked').length;

    if (isCheckedCheckbox > 0 && isCheckedRadio > 0 && isCheckedCheckbox === isCheckedRadio) {
        var values = document.getElementsByClassName('category-select');

        for (var i = 0; i < values.length; i++) {
            if (values[i].checked == true) {
                selectedValue = values[i].value;
                memberId = values[i].dataset.memberid;

                const arrIndex = selectedMembers.map(e => e.memberId).indexOf(memberId);
                if (arrIndex >= 0) {
                    selectedMembers[arrIndex].categoryName = selectedValue
                }
            }
        }

        var dataElement = document.getElementsByClassName('available-group-item');

        for (i = 0; i < dataElement.length; i++) {

            groupId = dataElement[i].dataset.groupid;
            // const groupIndex = groupData[Object.keys(groupData)[groupId]];
            // const arrIndex = groupData.map(em => em.id).indexOf(groupId);

            // groupIndex.categoryName = selectedMembers[arrIndex].categoryName
            // console.log("GROUP", arrIndex);
            console.log("MemberID", memberId)
            break;
        }

        closeAddMembersWrapper();
    } else {
        alert("Please select the category");
    }
};


// Remove a group
$('#available-groups-wrapper').on('click', '.remove-group-button', function () {
    let dataElement = this.parentElement.parentElement
    groupId = dataElement.dataset.groupid;
    delete groupData[groupId];
    groupData = groupData.filter(x => x);
    dataElement.remove();

    localStorage.setItem('newGroupList', JSON.stringify(groupData));
    loadList();
    loadaAvailableList();
});



// // Get Contact List to validate
// var options = new ContactFindOptions();
// options.filter="";
// options.multiple=true; 
// var fields = ["displayName", "phoneNumbers"];
// navigator.contacts.find(fields, onSuccess, onError, options);


// function onSuccess(contacts) {
//     for (var i=0; i<contacts.length; i++) {
//         console.log("Display Name = " + contacts[i].displayName);
//         if(null != contacts[i].phoneNumbers)
//             {
//                 for(var j=0;j<contacts[i].phoneNumbers.length;j++)
//                 {
//                     contact = {
//                         contactName: contacts[i].displayName,
//                         contactNumber: contacts[i].phoneNumber[j].value
//                     }
//                     contactList.push(contact);
//                 }
//             }
//     }
// }

// function onError() {
// 	alert('Error on getting contacts!');
// };


$(document).ready(function () {

    var timer;
    var timerTwo;

    $("#user-register-button").click(function () {
        $("#user-register").slideDown("slow");
        $(".user-login").hide("slow");
        $(".register-title").text("Create Account");
        $(".register-sub-title").text("Please sign-up for Nation's Watchmen");
    });

    $("#log-in-again").click(function () {
        $(".user-login").slideDown("slow");
        $("#user-register").hide("slow");
        $(".register-title").text("Log In");
        $(".register-sub-title").text("Please log-in to Nation's Watchmen");
    });

    $("#create-group-cancel").click(function () {
        $(".group-name-input").slideUp();
        $("#create-group-input").val("");
    });

    $('#group-list-wrapper').on('click', '.emergency-button', function () {
        $('.emergency-confirm-alert').fadeIn();
        $(".alarm-background-overlay").show();
        timer = setTimeout(function () {
            $('.emergency-confirm-alert').fadeOut();
            $(".alarm-background-overlay").show();
            $(".alarm-wrapper").show();

            setTimeout(function () {
                $('.alarm-wrapper').fadeOut('fast');
                $(".alarm-background-overlay").fadeOut('fast');
            }, 5000);

        }, 5000);
    });

    if (groupData.length && groupData.length != null) {
        $(".your-groups-text").text("Your Groups");
    } else {
        $(".your-groups-text").text('Please create a group by pressing "+" icon');
    }

    $("#confirm-emergency-yes").click(function () {
        $(".emergency-confirm-alert").hide();
        $(".alarm-background-overlay").show();
        $(".alarm-wrapper").show();
        timerTwo = setTimeout(function () {
            $('.alarm-wrapper').fadeOut('fast');
            $(".alarm-background-overlay").fadeOut('fast');
        }, 5000);
    });

    $("#confirm-emergency-cancel").click(function () {
        clearTimeout(timer);
        clearTimeout(timerTwo);
        $(".alarm-wrapper").hide();
        $(".alarm-background-overlay").hide();
    });

    $(".alarm-wrapper").click(function () {
        $(".emergency-confirm-alert").fadeOut();
    });

    $("#disable-emergency").click(function () {
        $(".alarm-background-overlay").hide();
        $(".alarm-wrapper").hide();
    });

    $('.add-members-button').bind('click', function (e) {
        e.preventDefault();
        $(".add-member-wrapper").slideDown();
    });

    $("#cancel-add-members-btn").click(function () {
        $(".add-member-wrapper").slideUp();
    });


    // $('#group-list-wrapper').on('click', '.group-notifications', function () {
    //     $(".group-notifications-wrapper").slideDown();
    //     var groupName = $(this).parent().parent().children('.group-item-details').children('.group-item-name').children('.group-item-name');
    //     var groupText = groupName.prevObject.text();
    //     $('.group-notification-title').text(`${groupText} group recent notifications`);
    // });

    // $("#close-notification-panel").click(function () {
    //     $(".group-notifications-wrapper").slideUp();
    // });

    $(".main-notifications-pannel").bind('click', function (e) {
        e.preventDefault();
        $(".all-notifications-wrapper").slideDown();
    });

    $("#close-all-notification-panel").click(function () {
        $(".all-notifications-wrapper").slideUp();
    });

    $("#confirm-acknowledge-alarm").click(function () {
        $(".acknowledge-alarm-wrapper").slideUp();
        $(".alarm-background-overlay").hide();
    });

    $("#acknowledge-them").click(function () {
        $(".alarm-background-overlay").show();
        $(".acknowledge-alarm-wrapper").slideDown();
    });

    $("#group-wrapper-close").click(function () {
        $(".member-details-body").slideUp();
        $("#groups-screen").slideDown();
    });

    $("#user-settings").click(function () {
        $(".user-profile-wrapper").slideDown();
    });

    $("#update-user-data-btn").click(function () {
        $(".user-profile-wrapper").slideUp();
    });

    $("#close-user-menu-btn").click(function () {
        $(".user-profile-wrapper").slideUp();
    });

    $(document).click(function (e) {
        if (!$(e.target).is('a')) {
            $('.collapse').collapse('hide');
        }
    });

    $('.nav-link').click(function () {
        $('.collapse').collapse('hide');
    });

    $('#available-groups-wrapper').on('click', '.add-members-main-button', function () {
        $("#groups-screen").slideUp();
        $(".member-details-body").slideDown();
    });

    $('#log-out').click(function () {
        localStorage.removeItem('loginData');
        location.reload();
    });

    if ($('.login-main').css('display') == 'none' && $('#main-sections-switcher').css('display') == 'block') {
        $('.nav-status-bar').show();
        $('.navbar-toggler').show();
        $('#acknowledge-them').show();
    } else {
        $('.nav-status-bar').hide();
        $('.navbar-toggler').hide();
        $('#acknowledge-them').hide();
    };

    homeScreenTiles();
    homeTileSize();

    // $(".alarm-button").addClass('tab-active');

    $('#alarm-tab').click(function () {
        $("#main-sections-switcher").slideUp();
        $(".main-screen").slideDown();
        $(".go-back").show();
        homeScreenTiles();
    });

    $('#groups-tab').click(function () {
        $("#main-sections-switcher").slideUp();
        $("#groups-screen").slideDown();
        $(".go-back").show();
    });

    $('.go-back').click(function () {
        $("#groups-screen").slideUp();
        $(".main-screen").slideUp();
        $(".add-member-wrapper").slideUp();
        $(".all-notifications-wrapper").slideUp();
        $(".member-details-body").slideUp();
        $(".user-profile-wrapper").slideUp();
        $("#main-sections-switcher").slideDown();
        $(".go-back").hide();
    });

    $('#create-group-button').click(function () {
        $(".group-name-input").slideDown();
    });
});
