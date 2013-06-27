class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_locale
 
  private
  def extract_locale_from_accept_language_header
    request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end

  def set_locale
    I18n.locale = extract_locale_from_accept_language_header || I18n.default_locale
  end

  def default_url_options(options={})
    {:locale => I18n.locale}
  end
end
