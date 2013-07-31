module ApplicationHelper
  # gets called by all the controllers at runtime to determine locale value passed in
  def layout_locale
    if I18n.locale == :en
      return "application_en"
    else 
      return "application"
    end
  end

  def is_admin?(user)
    return user.user_role.include?('admin')
  end
end
